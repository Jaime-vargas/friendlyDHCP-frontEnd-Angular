import {Component, inject, input, output, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';

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

  // FORM
  private deviceForm = inject(FormBuilder);
  form = this.deviceForm.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    mac_address: ['',[ Validators.required, Validators.pattern("^([0-9A-F]{2}:){5}([0-9A-F]{2})$")]],
    ip_address: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    network_id: ['', Validators.required],
  });

  // FORM Submit
  submitSave = output<any>()
  onSubmit() {
    // conditional if it is editing or not.
    this.submitSave.emit(this.form.getRawValue());
  }

  // MODAL
  modalVisible = input<boolean>();
  modalClose = output();
  modalReset(){
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.modalClose.emit();
  }
  listOfNetworks = input<{id: number, name: string}[]>([]);

}
