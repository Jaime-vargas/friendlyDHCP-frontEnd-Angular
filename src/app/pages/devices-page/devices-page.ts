import {Component, inject, signal} from '@angular/core';
import {TopBar} from '../../components/top-bar/top-bar';
import {DevicesTable} from '../../components/devices-table-modal/devices-table';

import {DeviceApiService} from '../../service/device-api.service';
import {Device} from '../../models/Device';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-devices-page',
  imports: [
    TopBar,
    DevicesTable,
    NzButtonComponent
  ],
  templateUrl: './devices-page.html',
  styleUrl: './devices-page.css',
})
export class DevicesPage {

  private deviceApiService: DeviceApiService = inject(DeviceApiService);
  private _devices = signal<Device[]>([]);

  constructor(private message: NzMessageService) {
    this.getAllDevices();
  }

  // Table
  public tableLoading = signal<boolean>(false);
  public devices = this._devices.asReadonly();

  // Modal
  modalVisible = signal<boolean>(false);

  // Notifications
  createBasicMessage(): void {
    this.message.success('Deleted successfully.', {
      nzDuration: 3000
    });
  }

  // Api Requests
  getAllDevices() {
    this.tableLoading.set(true);

    this.deviceApiService.getAll().subscribe({
      next: data => {
        this._devices.set(data);
      },error:(err) => {
        console.log(err);
      },
      complete: () => {
        setTimeout(() => this.tableLoading.set(false),2000);
      }
    });
  }

  deleteDevice(id: number) {
    this.deviceApiService.delete(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllDevices()
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.createBasicMessage();
      }
    })
  }


}
