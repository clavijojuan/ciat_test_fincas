import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VisorComponent } from './visor/visor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VisorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
