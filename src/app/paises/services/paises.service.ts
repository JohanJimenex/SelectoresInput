import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Pais {
  "name": string;
  "alpha3Code": string;
}

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _listaRegiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get listaRegiones(): string[] {
    return [...this._listaRegiones];
  }

  urlBase: string = 'https://restcountries.com/v2';

  constructor(private http: HttpClient) { }

  public getPaisesPorRegion(region: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.urlBase}/region/${region}?fields=alpha3Code,name`);
  }

  public getPaisPorCodigo(codigo: string): Observable<any[] | null> {

    if (codigo == '') {
      return of(null)
    }

    return this.http.get<string[]>(`${this.urlBase}/alpha/${codigo}?fields=borders`);
  }

}
