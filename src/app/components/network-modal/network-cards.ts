import {Component, inject, input, signal} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {Network} from '../../models/Network';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-network-modal',
  imports: [NzCardModule, NzTypographyModule, NzFlexDirective, NzButtonComponent,NzSkeletonModule],
  templateUrl: './network-cards.html',
  styleUrl: './network-cards.css',
})
export class NetworkCards {
  networks = input<Network[]>([]);

  //skeleton
  loading =input.required<boolean>();

}
