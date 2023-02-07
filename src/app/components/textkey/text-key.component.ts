import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TextKey} from "../../model/text-key.model";
import {TextKeyService} from "../../services/text-key.service";
import {DocumentsService} from "../../services/documents.service";
import {NetworkTypeService} from "../../services/network-type.service";
import {TextKeySearch} from "../../model/search/text-key-search.model";
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {DialogTextKeyRemove} from "./dialogs/remove/dialog-text-key-remove";
import {DialogTextKeyCreateUpdate} from "./dialogs/create-update/dialog-text-key-create-update";

@Component({
  selector: 'app-text-key',
  templateUrl: './text-key.component.html',
  styleUrls: ['./text-key.component.css']
})
export class TextKeyComponent implements AfterViewInit, OnInit {

  networkTypesForm = new FormControl('');
  networkTypeList: string[] = [];

  printedOnDocumentsForm = new FormControl('');
  printedOnDocumentsList: string[] = [];

  displayedColumns: string[] = ['select', 'position', 'code', 'description', 'additionalInfo', 'documentTypes',
    'businessFunctions', 'networkTypes', 'availableForPrinting', 'imported', 'company', 'textKeyMapping'];
  dataSource = new MatTableDataSource<TextKey>([]);
  selection = new SelectionModel<TextKey>(false, []);

  textKeySearch: TextKeySearch;
  selectedNetworkTypes: [];
  selectedDocumentTypes: [];
  resultsLength: number = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private textKeyService: TextKeyService,
              private documentsService: DocumentsService,
              private networkTypeService: NetworkTypeService,
              public dialog: MatDialog) {

    this.dataSource.paginator = this.paginator;
    this.selectedNetworkTypes = [];
    this.selectedDocumentTypes = [];
    this.textKeySearch = {
      code: null, textKeyMapping: null, description: null, company: null, documentTypes: null, networkTypes: null, page: 0, pageSize: 0
    };
  }

  ngOnInit(): void {
    this.networkTypeService.getNetworkTypes()
      .subscribe(types => {
        this.networkTypeList = types;
      });
    this.documentsService.getDocumentTypes()
      .subscribe(documents => {
        this.printedOnDocumentsList = documents;
      });
    }



  ngAfterViewInit() {
    this.loadTextKeys();
  }

  loadTextKeys(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.textKeySearch.page = this.paginator.pageIndex;
          this.textKeySearch.pageSize = this.paginator.pageSize;
          this.textKeySearch.networkTypes = this.selectedNetworkTypes.length !== 0 ? this.selectedNetworkTypes.join(',') : null;
          this.textKeySearch.documentTypes = this.selectedDocumentTypes.length !== 0 ? this.selectedDocumentTypes.join(',') : null;
          return this.textKeyService.search(this.textKeySearch)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;
          return data.textKeys;
        }),
      )
      .subscribe(data => (this.dataSource.data = data));
  }

  searchTextKeys() {
    this.loadTextKeys();
  }

  resetTextKeys() {
    this.textKeySearch.code = null;
    this.textKeySearch.textKeyMapping = null;
    this.textKeySearch.description = null;
    this.textKeySearch.company = null;
    this.selectedNetworkTypes = [];
    this.selectedDocumentTypes = [];
    this.loadTextKeys();
  }

  clearTextKeys() {
    this.textKeySearch.code = null;
    this.textKeySearch.textKeyMapping = null;
    this.textKeySearch.description = null;
    this.textKeySearch.company = null;
    this.selectedNetworkTypes = [];
    this.selectedDocumentTypes = [];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row ?: TextKey): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  createTextKey() {
    const dialogRef = this.dialog.open(DialogTextKeyCreateUpdate);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTextKeys();
      }
    });
  }

  updateTextKey(selected: TextKey[]) {
    const dialogRef = this.dialog.open(DialogTextKeyCreateUpdate, {
      data: selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [];
        this.loadTextKeys();
      }
    });
  }

  deleteTextKey(selected: TextKey[]) {
    this.openDialog(DialogTextKeyRemove, '250px', selected[0]);
  }

  openDialog<T>(component: ComponentType<T>, dialogWidth: string, dialogData: TextKey): void {
    const dialogRef = this.dialog.open(component, {
      width: dialogWidth,
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTextKeys();
      }
    });
  }
}
