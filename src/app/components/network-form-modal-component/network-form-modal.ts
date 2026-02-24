import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {Network} from '../../models/Network';

@Component({
  selector: 'app-network-form-modal-component',
  imports: [
    NzModalModule,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    FormsModule,
    NzFormControlComponent,
    NzInputDirective,
    NzMenuModule,
    ReactiveFormsModule,
    NzTypographyComponent,
    NzFlexDirective,
    NzButtonComponent
  ],
  templateUrl: './network-form-modal.html',
  styleUrl: './network-form-modal.css',
})
export class NetworkFormModal {

  constructor() {
    effect(() => {
      const visible = this.modalVisible();
      if (!visible) {
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.modalTitle.set("New network");
      }
    });

    effect(() => {
      const network = this.networkToEdit();
      if (!network) return;
        this.modalTitle.set("Editing network");
        this.form.patchValue({
          name: network.name,
          subnet: network.subnet,
          netmask: network.netmask,
          start_range: network.start_range,
          end_range: network.end_range,
          default_lease_time: network.default_lease_time,
          max_lease_time: network.max_lease_time,
          router: network.router,
          primary_dns: network.primary_dns,
          secondary_dns: network.secondary_dns
        });
    });
  }

  // EDITING
  networkToEdit = input<Network | null>()

  // MODAL
  modalTitle = signal("New network");
  modalVisible = input<boolean>();
  modalClose = output();

  // SUBMIT
  submitSave = output<any>();
  submitUpdate = output<any>();
  onSubmit() {
    if (this.networkToEdit === null){
      this.submitSave.emit(this.form.getRawValue());
    }else {
      this.submitUpdate.emit(this.form.getRawValue());
    }
  }

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    subnet: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    netmask: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    start_range: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    end_range: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    default_lease_time: ['',[Validators.required, Validators.pattern("^[0-9]{1,4}$")]],
    max_lease_time: ['',[Validators.required, Validators.pattern("^[0-9]{1,4}$")]],
    router: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    primary_dns: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
    secondary_dns: ['', [Validators.required, Validators.pattern("^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$")]],
  });
}
