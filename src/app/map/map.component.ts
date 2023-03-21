import { length } from './../length';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './../location.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { icon, marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  private map: any;
  @Input() ip: string = '193.62.157.66';
  constructor(private http: HttpClient, public serv: LocationService) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initMap();
  }
  setViewByIp() {
    this.http
      .get<length>(`https://ipapi.co/${this.ip}/json/`)
      .subscribe((response) => {
        console.log('ip changed');
        const { latitude, longitude } = response;
        this.map.flyTo([latitude, longitude], 10, {
          animate: true,
          duration: 1.3,
        });
        L.circle([Number(latitude), Number(longitude)], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 1000,
        }).addTo(this.map);
      });
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [41.716667, 44.783333],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setViewByIp();
  }
}
