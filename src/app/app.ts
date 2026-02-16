import {Component} from '@angular/core';

import {SideBarMenu} from './components/side-bar-menu/side-bar-menu';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [SideBarMenu, RouterOutlet, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
