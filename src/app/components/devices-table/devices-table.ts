import {Component, signal, input, computed} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import { NzInputModule, } from 'ng-zorro-antd/input';

import {Device} from '../../models/Device';
import {NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-devices-table',
  standalone: true,
  imports: [
    NzTableModule, NzInputModule, NzFormLabelComponent, NzSelectComponent, NzFlexDirective, FormsModule, NzOptionComponent,
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
    { key: 'action', title: 'Actions' },
  ]);
  devices = input.required<Device[]>();

  nameFilter = signal("");
  categoryFilter = signal("");
  macFilter = signal("");
  ipFilter = signal("");
  networkFilter = signal<string | null>(null);

  availableNetworks = computed(() => {
    const networks = this.devices().map(d => d.network_name);
    return [...new Set(networks)];
  });

  filterDevices = computed(()=> {
    return this.devices().filter(device => {
       const matchesName =  device.name.toLowerCase().includes(this.nameFilter().toLowerCase());
       const matchesCategory =  device.category.toLowerCase().includes(this.categoryFilter().toLowerCase());
       const matchesMac =  device.mac_address.toLowerCase().includes(this.macFilter().toLowerCase());
       const matchesIp =  device.ip_address.toLowerCase().includes(this.ipFilter().toLowerCase());
       const matchesNetwork =  !this.networkFilter() ||
         device.network_name === this.networkFilter();
       return (
         matchesName &&
         matchesCategory &&
         matchesMac &&
         matchesIp && matchesNetwork
       )
    })
    }
  )


}
