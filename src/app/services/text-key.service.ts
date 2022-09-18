import {Injectable} from '@angular/core';
import {SharedService} from "./shared.service";
import {HttpClient} from "@angular/common/http";
import {TextKeySearch} from "../model/search/text-key-search.model";
import {TextKeyList} from "../model/list/text-key-list.model";
import {Observable} from "rxjs";
import {TextKey} from "../model/text-key.model";

@Injectable({
  providedIn: 'root'
})
export class TextKeyService {

  private readonly SERVER_URL: string;
  private readonly SEARCH: string;
  private readonly REMOVE: string;
  private readonly SAVE: string;

  constructor(private shared: SharedService,
              private http: HttpClient) {
    this.SERVER_URL = this.shared.getServerURL();
    this.SEARCH = this.SERVER_URL + '/textkey/search';
    this.REMOVE = this.SERVER_URL + '/textkey/{id}';
    this.SAVE = this.SERVER_URL + '/textkey/';
  }

  search(textKeySearch: TextKeySearch): Observable<TextKeyList> {
    return this.http.post<TextKeyList>(this.SEARCH, textKeySearch);
  }

  remove(id: any): Observable<Object> {
    const regExp = /{id}/gi;
    const url = this.REMOVE.replace(regExp, id.toString());
    return this.http.delete<Observable<Object>>(url);
  }

  save(textKey: TextKey): Observable<TextKey> {
    return this.http.post<TextKey>(this.SAVE, textKey);
  }
}
