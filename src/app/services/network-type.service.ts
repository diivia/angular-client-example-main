import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkTypeService {

  constructor() { }

  getNetworkTypes() {
    return ['LTL/FTL', 'KN NNC', 'EXTERNAL', '24PLUS'];
  }
}
