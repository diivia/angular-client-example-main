import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextKey} from "../../../../model/text-key.model";
import {TextKeyService} from "../../../../services/text-key.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'dialog-text-key-remove',
  templateUrl: 'dialog-text-key-remove.html',
  styleUrls: ['./dialog-text-key-remove.css']
})
export class DialogTextKeyRemove {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  isLoadingResults = false;

  constructor(public dialogRef: MatDialogRef<DialogTextKeyRemove>,
              @Inject(MAT_DIALOG_DATA) public data: TextKey,
              private textKeyService: TextKeyService,
              private _snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeTextKey(): void {
    this.isLoadingResults = true;
    this.textKeyService.remove(this.data.id).subscribe(data => {
      this.isLoadingResults = false;
      this.openSnackBar('Text key: ' + this.data.code + ' removed', 'Close');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }
}
