import { Component,OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav | undefined;

  constructor() { }
  ngOnInit(): void {}

}
