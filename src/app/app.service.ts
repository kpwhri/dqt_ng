import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Category, SearchResult, Item} from "./categories";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {
  constructor(private http: Http) {
  }

  search(term: string): Observable<SearchResult[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let options = new RequestOptions({headers: headers});

    return this.http
      .get(`http://mpe015:8090/api/search?query=${term}`, options)
      .map((r: Response) => r.json().search as SearchResult[]);
  }

  getCategory(stype: string, elementId: number): Observable<Category> {
    return this.http
      .get(`http://mpe015:8090/api/${stype}/add/${elementId}`)
      .map((r: Response) => r.json() as Category);
  }

  filterItems(querystring: string): Observable<any> {
    return this.http
      .get(`http://mpe015:8090/api/filter?${querystring}`);
  }
}
