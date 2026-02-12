import {Component, signal, input} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';

import {Device} from '../../models/Device';

@Component({
  selector: 'app-devices-table',
  standalone: true,
  imports: [
    NzTableComponent
  ],
  templateUrl: './devices-table.html',
  styleUrl: './devices-table.css',
})
export class DevicesTable {

  columns = signal([
    { key: 'id', title: 'ID' },
    { key: 'category', title: 'Category' },
    { key: 'name', title: 'Name' },
    { key: 'mac_address', title: 'MAC Address' },
    { key: 'ip_address', title: 'IP Address' },
    { key: 'network_name', title: 'Network' },
  ]);
  devices = input.required<Device[]>();
}
