import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as L from 'leaflet';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the map container with correct dimensions', () => {
    fixture.componentRef.setInput('width', '200px');
    fixture.componentRef.setInput('height', '400px');
    fixture.detectChanges();

    const mapContainer = el.query(By.css('.map')).nativeElement;
    expect(mapContainer.style.width).toBe('200px');
    expect(mapContainer.style.height).toBe('400px');
  });

  it('should initialize the map on AfterViewInit', () => {
    spyOn<any>(component, 'initMap').and.callThrough();

    fixture.detectChanges();
    expect(component['initMap']).toHaveBeenCalled();
  });

  it('should create a Leaflet map instance', () => {
    fixture.detectChanges();

    expect(component['map']).toBeTruthy();
    expect(component['map'] instanceof L.Map).toBeTrue();
  });

  it('should set the map view to the correct coordinates', () => {
    fixture.componentRef.setInput('lat', '40.7128');
    fixture.componentRef.setInput('lng', '-74.0060');
    fixture.detectChanges();

    const center = component['map']?.getCenter();
    expect(center?.lat).toBeCloseTo(40.7128, 4);
    expect(center?.lng).toBeCloseTo(-74.0060, 4);
  });

  it('should add a marker at the given location', () => {
    fixture.detectChanges();

    const markers = (component['map'] as L.Map).eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        expect(layer.getLatLng().lat).toBeCloseTo(51.505, 4);
        expect(layer.getLatLng().lng).toBeCloseTo(-0.09, 4);
      }
    });
  });
});
