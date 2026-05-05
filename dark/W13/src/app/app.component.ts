import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Auth</h1>
    <nav>
      <a routerLink="/register">Register</a>
      <a routerLink="/login">Login</a>
      <a routerLink="/profile">Profile</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
