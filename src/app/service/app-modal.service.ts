import {NzModalService} from 'ng-zorro-antd/modal';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppModalService {

  constructor(private modal: NzModalService) {}
  showError(message: string) {
    this.modal.error({
      nzTitle: 'Error',
      nzContent: message
    });
  }
}
