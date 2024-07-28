import { Routes } from '@angular/router';
import { VisorComponent } from './visor/visor.component';
import { FincaComponent } from './visor/components/finca/finca.component';

export const routes: Routes = [
  {
    path: '',
    children: [{ path: 'finca', component: FincaComponent }],
  },
];
