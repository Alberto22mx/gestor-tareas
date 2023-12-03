import { Component } from '@angular/core';
import { MenuComponent } from '../../theme/general/menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loging',
  standalone: true,
  imports: [MenuComponent, RouterModule],
  templateUrl: './loging.component.html',
  styleUrl: './loging.component.css'
})
export class LogingComponent {

}
