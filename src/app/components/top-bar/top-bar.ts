import {Component, inject, Injectable, output, signal} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {TopBarService} from './top-bar.service';

@Component({
  selector: 'app-top-bar',
  imports: [
    NzFlexDirective,
    NzTypographyComponent
  ],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
}
