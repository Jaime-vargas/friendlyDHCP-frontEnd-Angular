import {Component, inject, signal} from '@angular/core';
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {TopBar} from "../../components/top-bar-component/top-bar";
import {NzInputDirective} from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {ConfigApiService} from '../../service/config-api.service';
import {Settings} from '../../models/settings';
import {AppModalService} from '../../service/app-modal.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-settings-page',
  imports: [
    NzFormModule,
    NzTypographyComponent,
    TopBar,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzButtonComponent,
    NzFlexDirective,
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage {

  private configApiService: ConfigApiService = inject(ConfigApiService)
  constructor(private message: NzMessageService) {
    this.settingsForm.disable();
    this.getSettings();
  }
  private appModalService = inject(AppModalService);
  // Notifications
  createSuccessMessage(message: string): void {
    this.message.success(message, {
      nzDuration: 3000
    });
  }

  settings = signal<Settings | undefined>(undefined);
  getSettings(): void {
    this.configApiService.get().subscribe({
      next: data => {
        this.settings.set(data);
      },error: (err: Error) => {
        this.appModalService.showError(
          err.message || "Error API on saving settings."
        );
      },
      complete: () => {
        this.setFormData();
      }
    })
  }

  onSubmit(){
    this.configApiService.update(this.settingsForm.getRawValue()).subscribe({
      next: data => {
        this.settings.set(data);
      },error: (err: Error) => {
      this.appModalService.showError(
        err.message || "Error API on saving settings."
      );
      this.edit();
    },
      complete:()=> {
        this.setFormData();
        this.edit();
        this.createSuccessMessage('Saved successfully.');
      }
    })
  }

  isEditing = signal(false);
  //FORM
  private deviceForm = inject(FormBuilder);
  settingsForm = this.deviceForm.nonNullable.group({
    sshIpAddress: ['',  Validators.required],
    sshPort: [0, Validators.required],
    sshUser: ['', Validators.required,],
    sshPassword: ['',Validators.required],
    routeToCopyConfigFile: ['', Validators.required],
    commandToMoveConfigFile: ['', Validators.required],
    commandToRestartService: ['', Validators.required],
  });

  setFormData(){
    this.settingsForm.patchValue({
      sshIpAddress: this.settings()?.sshIpAddress,
      sshPort: this.settings()?.sshPort,
      sshUser: this.settings()?.sshUser,
      sshPassword: this.settings()?.sshPassword,
      routeToCopyConfigFile: this.settings()?.routeToCopyConfigFile,
      commandToMoveConfigFile: this.settings()?.commandToMoveConfigFile,
      commandToRestartService: this.settings()?.commandToRestartService
    })
  }

  protected edit() {
    if (!this.isEditing()) {
      this.settingsForm.enable();
      this.isEditing.set(true)
    }else {
      this.settingsForm.disable();
      this.setFormData();
      this.isEditing.set(false)
    }
  }
}
