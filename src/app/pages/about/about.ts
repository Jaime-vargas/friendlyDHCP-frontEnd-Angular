import { Component } from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {TopBar} from '../../components/top-bar-component/top-bar';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-about',
  imports: [
    TopBar,
    NzFlexDirective,
    NzTypographyComponent,
    NzIconDirective
  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
