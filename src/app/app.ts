import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NetworksPage} from './pages/networks-page/networks-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NetworksPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('friendly-dhcp-angular');
}
