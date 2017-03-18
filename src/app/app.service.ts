import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Category, SearchResult, UserForm} from './categories';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {

  public serverAddress = 'http://localhost:8090';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'localhost'
  });
  private postHeaders = new Headers({
    'Content-Type': 'application/json',
  });
  private options = new RequestOptions({headers: this.headers});
  private postOptions = new RequestOptions({headers: this.postHeaders});

  constructor(private http: Http) {
    this.http.get('../../server.json')
      .map((r: Response) => this.serverAddress = r.json().data.address);
    console.warn(this.serverAddress);
    if (this.serverAddress[this.serverAddress.length - 1] === '/') {
      this.serverAddress = this.serverAddress.substr(0, this.serverAddress.length - 1);
    }
  }

  search(term: string): Observable<SearchResult[]> {
    return this.http
      .get(`${this.serverAddress}/api/search?query=${term}`, this.options)
      .map((r: Response) => r.json().search as SearchResult[]);
  }

  getCategory(stype: string, elementId: number): Observable<Category> {
    return this.http
      .get(`${this.serverAddress}/api/${stype}/add/${elementId}`, this.options)
      .map((r: Response) => r.json() as Category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get(`${this.serverAddress}/api/category/all`, this.options)
      .map((r: Response) => r.json().categories as Category[]);
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
      .get(`${this.serverAddress}/api/user/check`, this.options)
      .map(this.extractData).catch(this.handleError);
  }

  submitUserForm(userModel: UserForm): any {
    return this.http.post(
      `${this.serverAddress}/api/user/submit`,
      // TODO: why does calling userModel.toJsonString() cause forwarding to /?name=um.name??
      {name: userModel.name, emailAddress: userModel.email,
        affiliation: userModel.affiliation, reasonForVisiting: userModel.reasonForUse},
      this.postOptions)
      .map(this.extractData).catch(this.handleError);
  }

  private extractData(r: Response) {
    let body = r.json();
    return body || {};
  }

  private handleError(error: any) {
    let msg = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.error(msg);
    return Observable.throw(msg);
  }
}
