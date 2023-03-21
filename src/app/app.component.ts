import { MapComponent } from './map/map.component';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  api: FormControl = new FormControl();
  data: any;
  ip: string = '193.62.157.66';
  londonip: any;

  constructor(private serv: LocationService) {}
  ngOnInit(): void {
    this.serv
      .get(
        'https://geo.ipify.org/api/v2/country?apiKey=at_p1VDwMoyoyrkexEPylt0XGtBrTezb&ipAddress=193.62.157.66'
      )
      .subscribe((val) => (this.data = val));
  }
  sendreq() {
    if (this.api.value) {
      this.serv
        .get(this.api.value)
        .pipe(
          tap((val: any) => {
            this.data = val;
            this.ip = val.ip;
            console.log(this.data);
          })
        )
        .subscribe();
      this.api.reset();
    } else {
      console.log('Type IP');
    }
  }
}

//41.716667 44.783333 tbilisi coordinates
