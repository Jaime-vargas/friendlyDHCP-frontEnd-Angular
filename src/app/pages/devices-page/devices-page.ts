import {Component, inject, signal} from '@angular/core';
import {TopBar} from '../../components/top-bar-component/top-bar';
import {DevicesTable} from '../../components/devices-table-component/devices-table';

import {DeviceApiService} from '../../service/device-api.service';
import {Device} from '../../models/Device';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import {DevicesFormModalComponent} from '../../components/devices-form-modal-component/devices-form-modal-component';
import {DeviceCreateDto} from '../../models/DeviceCreateDto';
import {NetworkApiService} from '../../service/network-api.service';
import {AppModalService} from '../../service/app-modal.service';

@Component({
  selector: 'app-devices-page',
  imports: [
    TopBar,
    DevicesTable,
    NzButtonComponent,
    DevicesFormModalComponent
  ],
  templateUrl: './devices-page.html',
  styleUrl: './devices-page.css',
})
export class DevicesPage {

  private networkApiService: NetworkApiService = inject(NetworkApiService);
  private deviceApiService: DeviceApiService = inject(DeviceApiService);
  private _devices = signal<Device[]>([]);

  constructor(private message: NzMessageService) {
    this.getAllDevices();
  }

  // ERROR MODAL SERVICE
  private appModalService = inject(AppModalService);

  // Table
  public tableLoading = signal<boolean>(false);
  public devices = this._devices.asReadonly();

  // Modal
  public modalVisible = signal<boolean>(false);
  modalOpen(): void {
    this.loadNetworks();
    this.modalVisible.set(true);
  }
  modalClose (){
    this.modalVisible.set(false);
    this.deviceToEdit.set(null);
  }

  deviceToEdit = signal<Device | null>(null);

  modalOpenToEdit (device: Device) {
    this.deviceToEdit.set(device);
    this.modalOpen();
  }
  //networks for modal
  public _listOfNetworks = signal<{id: number, name: string}[]>([]);
  public listOfNetworks = this._listOfNetworks.asReadonly();
  public loadNetworks(): void {
    this.networkApiService.getAll().subscribe({
      next: (networks) => {
        this._listOfNetworks.set(networks.map(n => {
          return {id: n.id, name: n.name};
        }))
      }
    })
  }

  // Notifications
  createSuccessMessage(message: string): void {
    this.message.success(message, {
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
        this.appModalService.showError(err.message || "Error API on get all devices");
      },
      complete: () => {
        setTimeout(() => this.tableLoading.set(false),100);
      }
    });
  }

  saveDevice(deviceDTO: DeviceCreateDto) {
      this.deviceApiService.create(deviceDTO).subscribe({
        next: device => {
          this._devices.update(current => [...current, device]);
        },
        error: err => {
          this.appModalService.showError(err.message || "Error API on saving device.");
        },
        complete: () => {
          this.createSuccessMessage('Saved successfully.');
          this.modalClose();
        }
      })
  }

  updateDevice(deviceDTO: DeviceCreateDto) {

    const device = this.deviceToEdit();
    if (!device) return;

    this.deviceApiService.update(device.id, deviceDTO).subscribe({
      next: updatedDevice => {

        this._devices.update(current =>
          current.map(d =>
            d.id === updatedDevice.id ? updatedDevice : d
          )
        );

      },
      error: err => {
        this.appModalService.showError(err.message);
      },
      complete: () => {
        this.createSuccessMessage('Updated successfully.');
        this.modalClose();
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
        this.appModalService.showError(err.message);
      },
      complete: () => {
        this.createSuccessMessage('Deleted successfully.');
      }
    })
  }
}
