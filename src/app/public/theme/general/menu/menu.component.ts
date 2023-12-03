import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(
    private router: Router,
) {}

  menu = [
    { id: 1, name: 'Usuarios', url: '/users' },
    { id: 2, name: 'Tareas', url: '/tasks'},
  ]
}
