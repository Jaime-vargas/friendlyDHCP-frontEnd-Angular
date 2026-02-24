import {Component, signal, input, computed, output} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import { NzInputModule, } from 'ng-zorro-antd/input';

import {Device} from '../../models/Device';
import {NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzModalModule } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-devices-table-component',
  standalone: true,
  imports: [
    NzTableModule, NzInputModule, NzFormLabelComponent, NzSelectComponent, NzFlexDirective, FormsModule, NzOptionComponent, NzButtonComponent,NzModalModule, NzButtonModule,
  ],
  templateUrl: './devices-table.html',
  styleUrl: './devices-table.css',
})
export class DevicesTable {

  constructor(private modal: NzModalService ) {}

  columns = signal([
    { key: 'name', title: 'Name', compare: (a: Device, b: Device) => a.name.localeCompare(b.name), priority: 1 },
    { key: 'category', title: 'Category', compare: (a: Device, b: Device) => a.category.localeCompare(b.category), priority: false },
    { key: 'mac_address', title: 'MAC Address', compare: (a: Device, b: Device) => a.mac_address.localeCompare(b.mac_address), priority: false },
    { key: 'ip_address', title: 'IP Address', compare: (a: Device, b: Device) => a.ip_address.localeCompare(b.ip_address), priority: false },
    { key: 'network_name', title: 'Network', compare: (a: Device, b: Device) => a.network_name.localeCompare(b.network_name), priority: false },
    { key: 'action', title: 'Actions', compare: false, priority: false },
  ]);
  devices = input.required<Device[]>();

  //table
  tableLoading = input.required<boolean>();
  delete = output<number>();
  edit = output<Device>();

  //Filter
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

  showDeleteConfirm(device: Device): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this device?',
      nzContent: `<b style="color: red;">${device.name}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete.emit(device.id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}
