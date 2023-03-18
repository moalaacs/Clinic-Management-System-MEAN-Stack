import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'authentication';

  isMenuVisible = false;

  constructor(private route: Router) {}
  ngDoCheck(): void {
    let currentRoute = this.route.url;
    if (currentRoute == '/login' || currentRoute == '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }
}
