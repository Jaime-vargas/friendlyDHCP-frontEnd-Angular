import { Routes } from '@angular/router';
import {NetworksPage} from './pages/networks-page/networks-page';
import { DevicesPage } from './pages/devices-page/devices-page';
import {SettingsPage} from './pages/settings-page/settings-page';
import {About} from './pages/about/about';

export const routes: Routes = [
  {
    path: 'networks',
    component: NetworksPage,
  },{
    path: 'devices',
    component: DevicesPage,
  },{
    path: 'settings',
    component: SettingsPage,
  },{
    path: 'about',
    component: About,
  },{
  path: '**',
    redirectTo: 'networks',
  }
];
