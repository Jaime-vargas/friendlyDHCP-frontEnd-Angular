import {Component, inject, input, output, signal} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {Network} from '../../models/Network';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-network-cards-component',
  imports: [NzCardModule, NzTypographyModule, NzFlexDirective, NzButtonComponent, NzSkeletonModule, NzIconDirective],
  templateUrl: './network-cards.html',
  styleUrl: './network-cards.css',
})
export class NetworkCards {
  networks = input<Network[]>([]);

  //skeleton
  loading =input.required<boolean>();

  //EDIT
  edit = output<Network>();

}
