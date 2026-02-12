import {Component, inject, input} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {Network} from '../../models/Network';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMenuDirective} from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-network-modal',
  imports: [NzCardModule, NzTypographyModule, NzFlexDirective, NzButtonComponent, NzMenuDirective],
  templateUrl: './network-cards.html',
  styleUrl: './network-cards.css',
})
export class NetworkCards {
  networks = input<Network[]>([]);

}
