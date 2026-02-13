import {Component, inject, signal} from '@angular/core';
import {TopBar} from '../../components/top-bar/top-bar';
import {DevicesTable} from '../../components/devices-table/devices-table';

import {DeviceApiService} from '../../service/device-api.service';
import {Device} from '../../models/Device';

@Component({
  selector: 'app-devices-page',
  imports: [
    TopBar,
    DevicesTable
  ],
  templateUrl: './devices-page.html',
  styleUrl: './devices-page.css',
})
export class DevicesPage {

  private deviceApiService: DeviceApiService = inject(DeviceApiService);
  public devices = signal<Device[]>([]);
  constructor() {
    this.getAllDevices();
  }

  getAllDevices() {
    this.deviceApiService.getAll().subscribe(devices => {
      this.devices.set(devices);
    });
  }


}
