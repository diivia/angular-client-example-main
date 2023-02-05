import {Injectable} from '@angular/core';
import {SharedService} from "./shared.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {TextKeySearch} from "../model/search/text-key-search.model";
import {TextKeyList} from "../model/list/text-key-list.model";
import {Observable, throwError} from "rxjs";
import {TextKey} from "../model/text-key.model";
import {catchError, map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

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

  remove(id: any): Observable<any> {
    const regExp = /{id}/gi;
    const url = this.REMOVE.replace(regExp, id.toString());
    return this.http.delete(url, {observe: 'response'})
      .pipe(catchError(this.handleError));

  }

// {observe: 'response'})
// .map((response: Response) => {
//   this.responseStatus = response.status;
//   return this.extractData(response);
// }
//   .catch(this.handleError);

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.statusText);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.message);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  save(textKey: TextKey): Observable<TextKey> {
    return this.http.post<TextKey>(this.SAVE, textKey);
  }

}
