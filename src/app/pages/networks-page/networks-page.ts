import {Component, inject, Output, signal,} from '@angular/core';
import {NetworkApiService}  from '../../service/network-api.service';
import {Network} from '../../models/Network';
import {NetworkCards} from '../../components/network-cards-component/network-cards';
import {NetworkFormModal} from '../../components/network-form-modal-component/network-form-modal';
import {TopBar} from '../../components/top-bar-component/top-bar';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { NzModalModule} from 'ng-zorro-antd/modal';
import {AppModalService} from '../../service/app-modal.service';
import {NetworkCreateDto} from '../../models/NetworkCreateDto';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-networks-page',
  imports: [
    NetworkCards, NetworkFormModal, TopBar, NzButtonComponent, NzModalModule,
  ],
  templateUrl: './networks-page.html',
  styleUrl: './networks-page.css',
})

export class NetworksPage {

  constructor(private message: NzMessageService) {
    this.getAll();
  }

  private networkApiService: NetworkApiService = inject(NetworkApiService);
  public networks = signal<Network[]>([]);
  public networkToEdit = signal<Network | null>(null);

  // Network cards
  public networkCardsLoading = signal<boolean>(true);

  // Modal
  public modalVisible = signal<boolean>(false);
  modalOpen(): void {
    this.modalVisible.set(true);
  }
  modalClose (){
    this.modalVisible.set(false);
    this.networkToEdit.set(null);
  }
  modalOpenToEdit (network: Network) {
    this.networkToEdit.set(network);
    this.modalOpen()
  }

  // ERROR MODAL SERVICE
  private appModalService = inject(AppModalService);

  // Notifications
  createSuccessMessage(message: string): void {
    this.message.success(message, {
      nzDuration: 3000
    });
  }

  getAll() {
    this.networkCardsLoading.set(true);
    this.networkApiService.getAll().subscribe({
      next: (networks) => {
        this.networks.set(networks);
      },
      error: (err) => {
        this.appModalService.showError(err.message || "Error API on get all networks");
      },
      complete: () => {
        setTimeout(()=> this.networkCardsLoading.set(false), 300);
      }
    });
  }

  saveNetwork(networkCreateDto: NetworkCreateDto){
    this.networkApiService.save(networkCreateDto).subscribe({
      next: (savedNetwork: Network) => {
        this.networks.update(current => [...current, savedNetwork]);
      },
      error: (err) => {
        this.appModalService.showError(err.message || "Error API on saving network.");
      },
      complete: () => {
        this.createSuccessMessage('Saved successfully.');
        this.modalClose();
      }
    });
  }

  updateNetwork(networkCreateDto: NetworkCreateDto) {
    const network = this.networkToEdit();
    if (!network) return
    this.networkApiService.update(network.id, networkCreateDto).subscribe({
      next: (savedNetwork: Network) => {
        this.networks.update(current =>
        current.map(n =>
          n.id === savedNetwork.id ? savedNetwork : n)
        );
      },
      error: (err) => {
        this.appModalService.showError(err.message || "Error API on updating network.");
      },
      complete: () => {
        this.createSuccessMessage('Updated successfully.');
        this.modalClose();
      }
    })
  }
}
