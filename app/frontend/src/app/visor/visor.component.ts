import { AfterViewInit, Component } from '@angular/core';
import { FincaComponent } from './components/finca/finca.component';

import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-visor',
  standalone: true,
  imports: [CommonModule, FincaComponent, RouterModule],
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.css',
})
export class VisorComponent implements AfterViewInit {
  private map!: L.Map;
  selectedMarker: number | undefined = 2;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([4.505, -75.09], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.setToolbar();
    this.setEvents();
  }

  setToolbar(): void {
    this.map.pm.addControls({
      position: 'topleft',
      drawCircle: false,
      drawPolygon: false,
      drawLine: false,
      drawPolyline: false,
      drawText: false,
      drawRectangle: false,
      drawCircleMarker: false,
      rotateMode: false,
      editMode: true,
      cutPolygon: false,
    });
  }

  setEvents() {
    this.map.on('pm:create', (e) => {
      this.map.pm.disableDraw();
      const { layer } = e;
      this.createPopupContent(layer);
    });
  }

  createPopupContent(layer: L.Layer) {
    let container = document.createElement('div');
    container.classList.add('popupContent');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('confirm');
    confirmButton.innerText = 'Confirmar';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.innerText = 'Cancelar';

    let buttonContainer = document.createElement('div');
    buttonContainer.append(cancelButton);
    buttonContainer.append(confirmButton);

    let div = document.createElement('div');
    div.innerText = '¿Está seguró de la ubicación del elemento?';

    container.append(div);
    container.append(buttonContainer);

    confirmButton.addEventListener('click', () => {
      const latlng = (layer as L.Marker).getLatLng();
      this.router.navigate(['./finca', latlng]);
      layer.closePopup();
    });
    cancelButton.addEventListener('click', () => {
      layer.closePopup();
    });
    layer.bindPopup(container);

    return container;
  }
}
