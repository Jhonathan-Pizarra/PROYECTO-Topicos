import { Injectable } from '@angular/core';
//servicios
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//operador map
import { map } from 'rxjs/operators';
import { IPelis } from '../model/IPelis.interface';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private url: string = '';
  private apiKey: string = 'b73873af';

  constructor(private http: HttpClient) { }

  searchMovies(title: string, type: string) {
    this.url = `https://www.omdbapi.com/?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`;
    return this.http.get<IPelis>(this.url).pipe(map(results => results['Search']));
  }

  getDetails(id: string) {
    return this.http.get<IPelis>(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
  
}
