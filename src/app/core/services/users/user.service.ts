import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment.development';
import { User } from '../../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private CORE_URL;

  constructor(private http: HttpClient) {
    this.CORE_URL = environment.GESTOR_TAREAS;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.CORE_URL + 'usuario');
  }
}
