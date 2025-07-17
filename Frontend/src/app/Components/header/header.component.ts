import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn = false;
  userName = '';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    this.isLoggedIn = !!token;
    this.userName = name ?? '';
  }

}
