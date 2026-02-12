import {Component, Injectable, input, signal} from '@angular/core';
import { NetworksPage} from './pages/networks-page/networks-page';
import {SideBarMenu} from './components/side-bar-menu/side-bar-menu';
import {RouterOutlet} from '@angular/router';
import {DevicesPage} from './pages/devices-page/devices-page';
import {About} from './pages/about/about';

@Component({
  selector: 'app-root',
  imports: [NetworksPage, DevicesPage, About, SideBarMenu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
