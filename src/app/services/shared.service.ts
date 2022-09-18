import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isProd: boolean = environment.production;

  private HOST_DEV = '/api';

  private HOST_PROD = 'http://my-host:80/api';

  private readonly SERVER_URL: string;

  constructor() {
    this.SERVER_URL = this.isProd ? this.HOST_PROD : this.HOST_DEV;
  }

  getServerURL() {
    return this.SERVER_URL;
  }

}
