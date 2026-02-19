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
    { key: 'name', title: 'Name' },
    { key: 'category', title: 'Category' },
    { key: 'mac_address', title: 'MAC Address' },
    { key: 'ip_address', title: 'IP Address' },
    { key: 'network_name', title: 'Network' },
    { key: 'action', title: 'Actions' },
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
