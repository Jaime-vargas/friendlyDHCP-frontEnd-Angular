import {Component, signal, input, computed} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import { NzInputModule, } from 'ng-zorro-antd/input';

import {Device} from '../../models/Device';
import {NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzFlexDirective} from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-devices-table',
  standalone: true,
  imports: [
    NzTableModule, NzInputModule, NzFormLabelComponent, NzSelectComponent, NzFlexDirective,
  ],
  templateUrl: './devices-table.html',
  styleUrl: './devices-table.css',
})
export class DevicesTable {

  columns = signal([
    { key: 'name', title: 'Name' },
    { key: 'category', title: 'Category' },
    { key: 'mac_address', title: 'MAC Address' },
    { key: 'ip_address', title: 'IP Address' },
    { key: 'network_name', title: 'Network' },
  ]);
  devices = input.required<Device[]>();

  nameFilter = signal("");
  categoryFilter = signal("");
  macFilter = signal("");
  ipFilter = signal("");
  networkFilter = signal<String[]>([]);
  filterDevices = computed(()=> {
    return this.devices().filter(device => {
       const matchesName =  device.name.toLowerCase().includes(device.name.toLowerCase());
       const matchesCategory =  device.category.toLowerCase().includes(device.category.toLowerCase());
       const matchesMac =  device.mac_address.toLowerCase().includes(device.mac_address.toLowerCase());
       const matchesIp =  device.ip_address.toLowerCase().includes(device.ip_address.toLowerCase());
       const matchesNetwork =  !this.networkFilter() || device.ip_address === "2";
       return (
         matchesName &&
         matchesCategory &&
         matchesMac &&
         matchesIp &&
         matchesNetwork
       )
    })
    }
  )


}
