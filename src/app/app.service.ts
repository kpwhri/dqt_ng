import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions, Request} from '@angular/http';
import {Category, SearchResult, Item} from "./categories";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {

  public serverAddress: string = "http://localhost:8090";
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'localhost'
  });
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
    this.http.get('../../server.json')
      .map((r: Response) => this.serverAddress = r.json().data.address);
    console.warn(this.serverAddress);
    if (this.serverAddress[this.serverAddress.length - 1] == '/') {
      this.serverAddress = this.serverAddress.substr(0, this.serverAddress.length-1);
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
      .get(`${this.serverAddress}/api/filter?${querystring}`, this.options);
  }
}
