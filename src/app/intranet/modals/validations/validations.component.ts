import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './validations.component.html',
  styleUrl: './validations.component.css'
})
export class ValidationsComponent {
  results: any;

  constructor(
    public dialogRef: MatDialogRef<ValidationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    this.results = data;
  }
  cerrar() {
    this.dialogRef.close({guardar: false, id: this.results.alerta.id});
  }

  guardar() {
    this.dialogRef.close({guardar: true, id: this.results.alerta.id});
  }
}
