import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as moment from "moment";

@Component({
  selector: 'app-tasks-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './tasks-modal.component.html',
  styleUrl: './tasks-modal.component.css'
})
export class TasksModalComponent {
  cliente: FormGroup = new FormGroup({
    id: new FormControl(null),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    // @ts-ignore
    fechaCreacion: new FormControl(moment().format(), Validators.required),
    estado: new FormControl('PENDIENTE', Validators.required),
  });
  titutlo: string = 'CREAR CLIENTE';

  constructor(
    public dialogRef: MatDialogRef<TasksModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if(this.data.tipo == 2) {
      this.titutlo = 'ACTUALIZAR CLIENTE';
      this.cliente.patchValue(this.data.cliente);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    
  }
}
