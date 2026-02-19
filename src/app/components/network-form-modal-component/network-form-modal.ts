import {Component, inject, input} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMenuModule} from 'ng-zorro-antd/menu';

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

  isModalVisible = input<boolean>();

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    subnet: ['', Validators.required],
    netmask: ['', Validators.required],
    start_range: ['', Validators.required],
    end_range: ['', Validators.required],
    default_lease_time: ['', Validators.required],
    max_lease_time: ['', Validators.required],
    router: ['', Validators.required],
    primary_dns: ['', Validators.required],
    secondary_dns: ['', Validators.required],
  });
}
