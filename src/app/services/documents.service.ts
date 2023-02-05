import {Injectable} from '@angular/core';
import {SharedService} from "./shared.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DocumentList} from "../model/list/document-list.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  document: Document;

  private readonly SERVER_URL: string;
  private readonly SEARCH: string;

  constructor(private shared: SharedService,
              private http: HttpClient) {
    this.SERVER_URL = this.shared.getServerURL();
    this.SEARCH = this.SERVER_URL + '/documents';

  }

  search(): Observable<DocumentList> {
    return this.http.post<DocumentList>(this.SEARCH, document);
  }

  getDocumentTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.SEARCH);
    //return ['521', 'L54', 'L01', 'L18', 'L05', '746'];
  }
}
