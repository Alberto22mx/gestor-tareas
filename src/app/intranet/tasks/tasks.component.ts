import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuComponent } from '../../public/theme/general/menu/menu.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../core/services/tasks/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../../core/models/tasks/task';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ValidationsComponent } from '../modals/validations/validations.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksModalComponent } from '../modals/tasks-modal/tasks-modal.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MenuComponent, HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [
    TaskService
  ],
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo',  'descripcion', 'fecha', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<Task>;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(tipo: number, tarea: any = 0): void {
    const dialogRef = this.dialog.open(TasksModalComponent, {
      width: '500px',
      data: {tipo, tarea},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined && result.tipo == 1) {
        this.createTask(result.tarea);
      } else if(result !== undefined) {
        this.updateTask(result.tarea);
      }
    });
  }

  createTask(task: Task) {
    this.taskService.postTasks(task).subscribe(task => {
      this.getTasks();
    });
  }

  updateTask(task: Task) {
    this.taskService.postTasks(task).subscribe(task => {
      this.getTasks();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTasks(id).subscribe(task => {
      this.getTasks();
    });
  }

  advertencia(enterAnimationDuration: string, exitAnimationDuration: string, task: Task): void {
    const dialogRef = this.dialog.open(ValidationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {alerta: task},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.guardar) {
        this.deleteTask(result.id)
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
