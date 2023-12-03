import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
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
  dataReturn: any;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(UsersModalComponent, {
      data: {name: "test"},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataReturn = result;
    });
  }

  updateUsers(id: number) {

  }

  deleteUsers(id: number) {

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
