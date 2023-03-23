import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'App';
  showHeaderFlage=false;
  constructor(private route:Router){}
  ngDoCheck(): void {
    let currentUrl = this.route.url;
    if(currentUrl=='/login' || currentUrl=='/register'){
      this.showHeaderFlage=false;
    }else{
      this.showHeaderFlage=true;
    }
  }
}
