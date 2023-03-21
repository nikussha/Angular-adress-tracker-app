import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // api: string =
  //   'https://geo.ipify.org/api/v2/country?apiKey=at_p1VDwMoyoyrkexEPylt0XGtBrTezb&ipAddress=8.8.8.8';
  // ip: any = '212.58.103.101';

  constructor(private http: HttpClient) {}
  get(ip: any) {
    return this.http
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_p1VDwMoyoyrkexEPylt0XGtBrTezb&ipAddress=${ip}`
      )
      .pipe(tap((val) => console.log(val)));
  }
}
