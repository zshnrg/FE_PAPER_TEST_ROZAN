import { AfterViewInit, Component, OnInit, input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  width = input<string>("200");
  height = input<string>("400px");

  lat = input<string | undefined>("51.505");
  lng = input<string | undefined>("-0.09");

  private map: L.Map | null = null;

  private initMap() {
    const lat = parseFloat(this.lat() || "51.505");
    const lng = parseFloat(this.lng() || "-0.09");

    this.map = L.map('map', {
      dragging: false,
      tapHold: false,
      zoomControl: false,
    }).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    L.marker([lat, lng]).addTo(this.map)
  }

  ngAfterViewInit() {
    this.initMap();
  }
}
