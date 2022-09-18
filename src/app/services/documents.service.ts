import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() {
  }

  getDocumentTypes() {
    return ['521', 'L54', 'L01', 'L18', 'L05', '746'];
  }
}
