import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import * as moment from "moment";
import { MatSelectModule } from '@angular/material/select';
interface Estado {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-tasks-modal',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatMenuModule,
    MatSelectModule
  ],
  templateUrl: './tasks-modal.component.html',
  styleUrl: './tasks-modal.component.css'
})
export class TasksModalComponent {
  results: any;
  estados: Estado[] = [
    {value: 'PENDIENTE', viewValue: 'PENDIENTE'},
    {value: 'ENPROCESO', viewValue: 'EN PROCESO'},
    {value: 'COMPLETADO', viewValue: 'COMPLETADO'},
  ];
  tarea: FormGroup = new FormGroup({
    id: new FormControl(null),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    // @ts-ignore
    fechaCreacion: new FormControl(moment().format(), Validators.required),
    estado: new FormControl('', Validators.required),
  });
  titutlo: string = 'CREAR TAREA';

  constructor(
    public dialogRef: MatDialogRef<TasksModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.results = data;
  }

  ngOnInit(): void {
    if(this.data.tipo == 2) {
      this.titutlo = 'ACTUALIZAR TAREA';
      this.tarea.patchValue(this.data.tarea);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    this.dialogRef.close({tarea: this.tarea.getRawValue(), tipo: this.results.tipo});
  }
}
