import {Component, inject, signal,} from '@angular/core';
import {NetworkApiService}  from '../../service/network-api.service';
import {Network} from '../../models/Network';
import {NetworkCards} from '../../components/network-modal/network-cards';
import {NetworkFormModal} from '../../components/network-form-modal/network-form-modal';
import {TopBarService} from '../../components/top-bar/top-bar.service';
import {TopBar} from '../../components/top-bar/top-bar';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-networks-page',
  imports: [
    NetworkCards, NetworkFormModal, TopBar, NzButtonComponent
  ],
  templateUrl: './networks-page.html',
  styleUrl: './networks-page.css',
})

export class NetworksPage {

  private topBar = inject(TopBarService);

  private networkApiService: NetworkApiService = inject(NetworkApiService);
  public modalVisible = signal<boolean>(false);
  public networks = signal<Network[]>([]);

  constructor() {
    this.topBar.buttonName.set("New Network");
    this.getAll();
  }

  getAll() {
    this.networkApiService.getAll().subscribe(networks => {
      this.networks.set(networks);
    })
  }

  handleModalVisible(){
    this.modalVisible.set(true);
  }
}
