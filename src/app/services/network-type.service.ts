import {Injectable} from '@angular/core';
import {SharedService} from "./shared.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NetworkTypeService {

  private readonly SERVER_URL: string;
  private readonly SEARCHTYPES: string;

  constructor(private shared: SharedService,
              private http: HttpClient) {
    this.SERVER_URL = this.shared.getServerURL();
    this.SEARCHTYPES = this.SERVER_URL + '/networktypes';}


  getNetworkTypes() {
    return this.http.get<string[]>(this.SEARCHTYPES);
    //return ['LTL/FTL', 'KN NNC', 'EXTERNAL', '24PLUS'];
  }
}
