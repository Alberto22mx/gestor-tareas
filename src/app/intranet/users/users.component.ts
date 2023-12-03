import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MenuComponent } from '../../public/theme/general/menu/menu.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../core/services/users/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../core/models/users/user';
import { MatDialog } from '@angular/material/dialog';
import { UsersModalComponent } from '../modals/users-modal/users-modal.component';
import { ValidationsComponent } from '../modals/validations/validations.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MenuComponent, HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [
    UserService
  ],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'usuario', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<User>;
  dataResult: any | undefined;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(tipo: number, usuario: any = 0): void {
    const dialogRef = this.dialog.open(UsersModalComponent, {
      width: '500px',
      data: {tipo, usuario},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataResult = result;
      if(this.dataResult !== undefined && this.dataResult.tipo == 1) {
        this.createUser(this.dataResult.usuario);
      } else if(this.dataResult !== undefined) {
        this.updateUser(this.dataResult.usuario);
      }
    });
  }

  createUser(usuario: User) {
    this.userService.postUser(usuario).subscribe(users => {
      this.getUsers();
    });
  }

  updateUser(usuario: User) {
    this.userService.putUser(usuario).subscribe(users => {
      this.getUsers();
    });
  }

  deleteUsers(id: number) {
    this.userService.deleteUser(id).subscribe(users => {
      this.getUsers();
    });
  }

  advertencia(enterAnimationDuration: string, exitAnimationDuration: string, usuario: User): void {
    const dialogRef = this.dialog.open(ValidationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {alerta: usuario},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.guardar) {
        this.deleteUsers(result.id)
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
