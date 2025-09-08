import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Category, Checksum, DataCategory, SearchResult, UserForm} from './categories';
import {Observable, throwError} from 'rxjs';
import {Config} from './app.config';


@Injectable()
export class CategoryService {

  public serverAddress = new Config().getServerAddress();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  private postHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  private options = {headers: this.headers};
  private postOptions = {headers: this.postHeaders};

  constructor(private http: HttpClient) {
    if (this.serverAddress[this.serverAddress.length - 1] === '/') {
      this.serverAddress = this.serverAddress.substring(0, this.serverAddress.length - 1);
    }
  }

  search(term: string): Observable<SearchResult[]> {
    return this.http
      .get<SearchResult[]>(`${this.serverAddress}/api/search?query=${term}`, this.options);
  }

  getCategory(stype: string, elementId: number): Observable<Category> {
    return this.http
      .get<Category>(`${this.serverAddress}/api/${stype}/add/${elementId}`, this.options);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.serverAddress}/api/category/all`, this.options);
  }

  getDataDictionary(): Observable<DataCategory[]> {
    return this.http
      .get<DataCategory[]>(`${this.serverAddress}/api/dictionary/get`, this.options);
  }

  getDataDictionaryMeta(): Observable<Checksum[]> {
    return this.http
      .get<Checksum[]>(`${this.serverAddress}/api/data/dictionary/meta`, this.options);
  }

  getDataDictionaryFile(): string {
    return `${this.serverAddress}/api/data/dictionary/get`;
  }

  filterItems(querystring: string): Observable<any> {
    return this.http
      .get(`${this.serverAddress}/api/filter/chart?${querystring}`, this.options);
  }

  exportFilters(querystring: string): Observable<any> {
    return this.http
      .get(`${this.serverAddress}/api/filter/export?${querystring}`, this.options);
  }

  /**
   * Check if the user has already authenticated (ip address already seen)
   */
  checkAuthenticated(): any {
    return this.http
      .get(`${this.serverAddress}/api/user/check`, this.options);
  }

  communicateCookie(cookie: string): any {
    return this.http.post(
      `${this.serverAddress}/api/user/cookie`,
      {
        cookie: cookie
      },
      this.postOptions);
  }

  getTabs(): any {
    return this.http
      .get(`${this.serverAddress}/api/tabs`, this.options);
  }

  getComments(component: string): any {
    return this.http
      .get(`${this.serverAddress}/api/comments/${component}`, this.options);
  }

  submitUserForm(userModel: UserForm): any {
    return this.http.post(
      `${this.serverAddress}/api/user/submit`,
      // TODO: why does calling userModel.toJsonString() cause forwarding to /?name=um.name??
      {
        name: userModel.name, emailAddress: userModel.email,
        affiliation: userModel.affiliation, reasonForVisiting: userModel.reasonForUse
      },
      this.postOptions);
  }

  private extractData(r: Response) {
    let body = r.json();
    return body || {};
  }

  private handleError(error: any) {
    let msg = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.error(msg);
    return throwError(() => new Error(msg));
  }
}
