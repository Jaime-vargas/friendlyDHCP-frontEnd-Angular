import {Component, inject, Output, signal,} from '@angular/core';
import {NetworkApiService}  from '../../service/network-api.service';
import {Network} from '../../models/Network';
import {NetworkCards} from '../../components/network-cards-component/network-cards';
import {NetworkFormModal} from '../../components/network-form-modal-component/network-form-modal';
import {TopBarService} from '../../components/top-bar-component/top-bar.service';
import {TopBar} from '../../components/top-bar-component/top-bar';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { NzModalModule} from 'ng-zorro-antd/modal';
import {AppModalService} from '../../service/app-modal.service';

@Component({
  selector: 'app-networks-page',
  imports: [
    NetworkCards, NetworkFormModal, TopBar, NzButtonComponent, NzModalModule,
  ],
  templateUrl: './networks-page.html',
  styleUrl: './networks-page.css',
})

export class NetworksPage {

  private topBar = inject(TopBarService);

  private networkApiService: NetworkApiService = inject(NetworkApiService);
  public modalVisible = signal<boolean>(false);
  public networks = signal<Network[]>([]);

  public networkCardsLoading = signal<boolean>(true);

  private appModalService = inject(AppModalService);

  constructor() {
    this.topBar.buttonName.set("New Network");
    this.getAll();
  }

  getAll() {
    this.networkCardsLoading.set(true);
    this.networkApiService.getAll().subscribe({
      next: (networks) => {
        this.networks.set(networks);
      },
      error: (err) => {
        this.appModalService.showError(err.message || "Error API calling getAll.");
      },
      complete: () => {
        setTimeout(()=> this.networkCardsLoading.set(false), 300);
      }
    });
  }

  handleModalVisible(){
    this.modalVisible.set(true);
  }
}
