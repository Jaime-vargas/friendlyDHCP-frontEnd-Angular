import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {Device} from '../../models/Device';

@Component({
  selector: 'app-devices-form-modal-component',
  imports: [
    NzModalModule,
    NzTypographyComponent,
    NzFormDirective,
    ReactiveFormsModule,
    NzFlexDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzButtonComponent,
    NzSelectComponent,
    NzOptionComponent
  ],
  templateUrl: './devices-form-modal-component.html',
  styleUrl: './devices-form-modal-component.css',
  standalone: true,
})
export class DevicesFormModalComponent {

  constructor() {
    // this effect reset all form fields on close
    effect(() => {
      const visible = this.modalVisible();
      if (!visible) {
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.modalTitle.set("New device");
      }
    });
    // this effect set the device data on form to edit an existing device
    effect(() => {
      const device = this.deviceToEdit();
      const networks = this.listOfNetworks();

      // esperar a que ambos existan
      if (!device || !networks.length) return;
      this.modalTitle.set("Editing device");
      this.form.patchValue({
        name: device.name,
        category: device.category,
        mac_address: device.mac_address,
        ip_address: device.ip_address,
        network_id: device.network_id
      });
    });
  }

  // FORM
  private deviceForm = inject(FormBuilder);
  form = this.deviceForm.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    mac_address: ['',[ Validators.required, Validators.pattern("^([0-9A-F]{2}:){5}([0-9A-F]{2})$")]],
    ip_address: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    network_id: [0, Validators.required],
  });

  // FORM Submit
  submitSave = output<any>();
  submitUpdate = output<any>();
  onSubmit() {
    if (this.deviceToEdit() === null) {
      this.submitSave.emit(this.form.getRawValue());
    }else {
      this.submitUpdate.emit(this.form.getRawValue());
    }
  }

  // MODAL
  modalTitle = signal("New device")
  modalVisible = input<boolean>();
  modalClose = output();

  listOfNetworks = input<{id: number, name: string}[]>([]);
  deviceToEdit= input<Device|null>();

}
