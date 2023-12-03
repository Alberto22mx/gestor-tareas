import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-modal',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule
  ],
  templateUrl: './users-modal.component.html',
  styleUrl: './users-modal.component.css'
})
export class UsersModalComponent {
  results: any;
  usuario: FormGroup = new FormGroup({
    id: new FormControl(null),
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellidoPaterno: new FormControl('', Validators.required),
    apellidoMaterno: new FormControl('', Validators.required),
    activo: new FormControl(1, Validators.required),
  });
  titutlo: string = 'CREAR USUARIOS';

  constructor(
    public dialogRef: MatDialogRef<UsersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.results = data;
  }

  ngOnInit(): void {
    if(this.data.tipo == 2) {
      this.titutlo = 'ACTUALIZAR CLIENTE';
      this.usuario.patchValue(this.data.usuario);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    this.dialogRef.close({usuario: this.usuario.getRawValue(), tipo: this.results.tipo});
  }
}
