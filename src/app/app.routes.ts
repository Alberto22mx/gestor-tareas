import { Routes } from '@angular/router';
import { LogingComponent } from './public/auth/loging/loging.component';
import { UsersComponent } from './intranet/users/users.component';
import { TasksComponent } from './intranet/tasks/tasks.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LogingComponent },
    {path: 'users', component: UsersComponent },
    {path: 'tasks', component: TasksComponent },
    {path: '**', component: LogingComponent},
];
