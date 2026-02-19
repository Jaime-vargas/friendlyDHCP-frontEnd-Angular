import {Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root'})
export class TopBarService {
  buttonName = signal("Button");
}
