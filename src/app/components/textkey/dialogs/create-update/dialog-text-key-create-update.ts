import {Component, Inject} from "@angular/core";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextKey} from "../../../../model/text-key.model";
import {TextKeyService} from "../../../../services/text-key.service";
import {FormControl} from "@angular/forms";
import {HttpContext} from "@angular/common/http";

@Component({
  selector: 'dialog-text-key-create-update',
  templateUrl: 'dialog-text-key-create-update.html',
  styleUrls: ['./dialog-text-key-create-update.css']
})
export class DialogTextKeyCreateUpdate {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  isLoadingResults = false;
  isDuplicatedEntry = false;

  additionalInfo: string[] = ['None', 'Date', 'Date/Time', 'Week'];
  selectedAdditionalInfo: string | null;

  networkTypesForm = new FormControl('');
  networkTypeList: string[] = ['LTL/FTL', 'KN NNC', 'EXTERNAL', '24PLUS'];
  selectedNetworkTypes: string[] = [];

  printedOnDocumentsForm = new FormControl('');
  printedOnDocumentsList: string[] = ['521', 'L54', 'L01', 'L18', 'L05', '746'];
  selectedDocumentTypes: string[] = [];

  businessFunctionsForm = new FormControl('');
  businessFunctionsList: string[] = ['RSC001', 'OTF001', 'CM0001', 'DM0001', 'SD0001', 'LHU001', 'LHL001', 'PO0001', 'DEM001'];
  selectedBusinessFunctions: string[] = [];

  textKeyForSave: TextKey = {
    position: 0, id: null, textKeyMapping: null, code: null, description: null, companyCode: null, additionalInfo: null,
    documentTypes: null, networkTypes: null, businessFunctions: null, availableForPrinting: false, imported: false
  }

  constructor(public dialogRef: MatDialogRef<DialogTextKeyCreateUpdate>,
              @Inject(MAT_DIALOG_DATA) public data: TextKey,
              private textKeyService: TextKeyService,
              private _snackBar: MatSnackBar) {
    if (data) {
      this.textKeyForSave = data;
      this.selectedAdditionalInfo = data.additionalInfo;
      if (data && data.businessFunctions) {
        this.selectedBusinessFunctions = String(data.businessFunctions).split(',');
      }
      if (data && data.networkTypes) {
        this.selectedNetworkTypes = String(data.networkTypes).split(',');
      }
      if (data && data.documentTypes) {
        this.selectedDocumentTypes = String(data.documentTypes).split(',');
      }
    }
  }

  createUpdateTextKey(): void {
    this.isLoadingResults = true;
    this.textKeyForSave.additionalInfo = this.selectedAdditionalInfo;
    this.textKeyForSave.networkTypes = this.selectedNetworkTypes.length !== 0 ? this.selectedNetworkTypes.join(',') : null;
    this.textKeyForSave.documentTypes = this.textKeyForSave.availableForPrinting && this.selectedDocumentTypes.length !== 0 ? this.selectedDocumentTypes.join(',') : null;
    this.textKeyForSave.businessFunctions = this.selectedBusinessFunctions.length !== 0 ? this.selectedBusinessFunctions.join(',') : null;
    this.textKeyService.save(this.textKeyForSave).subscribe({
      next: (textKey) => {
        console.log('next', textKey);
        this.isLoadingResults = false;
        this.openSnackBar('Text key: ' + textKey.code + ' saved', 'Close');
        this.dialogRef.close(textKey);
      },
      error: (e) => {
        console.error('error', e);
        this.isLoadingResults = false;
        this.isDuplicatedEntry = true;
        this.openSnackBar('Duplicated Text key cannot saved', 'Close');
      },
      complete: () => {
        console.info('complete');
      }
    });
    // this.textKeyService.save(this.textKeyForSave).subscribe(data => {
    //   this.isLoadingResults = false;
    //   this.openSnackBar('Text key: ' + data.code + ' saved', 'Close');
    // });
  }

  async closeDialog() {
    try {
      await this.textKeyService.save;
      this.dialogRef.close(); // make sure it only closes if the upper async fn succesfully ran!
    } catch(e) {
      console.log(e);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

}
