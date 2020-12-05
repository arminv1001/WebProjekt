import { Component } from '@angular/core';
// Das Componentn wird hautpsächlich nur HTML seitig verwendet.
// Im app.component.html wird eine Navbar erstellt mit Angular Materials
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Weather.com';
}
