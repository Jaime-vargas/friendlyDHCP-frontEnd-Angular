import {Component, signal, WritableSignal} from '@angular/core';
import {NetworkApiService}  from '../../service/network-api.service';
import {Device} from '../../models/Device';
import {Network} from '../../models/Network';

@Component({
  selector: 'app-networks-page',
  imports: [],
  templateUrl: './networks-page.html',
  styleUrl: './networks-page.css',
})
export class NetworksPage {
  private networks = signal<Network[]>([]);
  constructor(private networkApiService: NetworkApiService ) {}

  ngOnInit() {
    this.networkApiService.getAll().subscribe(networks => {
      this.networks.set(networks);
    })
    console.log(this.networks());
  }
}
