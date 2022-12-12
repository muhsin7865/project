import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogpost } from '../model/blogpost';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }
  apiUrl = "https://jsonplaceholder.typicode.com/posts";

  getAllBlogPosts(): Observable<Blogpost[]> {
    return this._http.get<Blogpost[]>(this.apiUrl);
  }
  searchBlogPost(id: any): Observable<Blogpost[]> {
    debugger;
    return this._http.get<Blogpost[]>(this.apiUrl + "/" + id);
  }
  LoadComments(id: any): Observable<any> {
    return this._http.get(this.apiUrl + "/" + id + "/comments");
  }

}
