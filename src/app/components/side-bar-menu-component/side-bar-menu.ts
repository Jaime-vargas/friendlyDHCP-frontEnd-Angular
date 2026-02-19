import { Component } from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-side-bar-menu-component',
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-bar-menu.html',
  styleUrl: './side-bar-menu.css',
})
export class SideBarMenu {

}
