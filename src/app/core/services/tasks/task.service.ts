import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment.development';
import { Task } from '../../models/tasks/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private CORE_URL;

  constructor(private http: HttpClient) {
    this.CORE_URL = environment.GESTOR_TAREAS;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.CORE_URL + 'tarea');
  }
}
