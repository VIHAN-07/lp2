import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    <section>
      <h2>Profile</h2>
      <ng-container *ngIf="user; else loggedOut">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button type="button" (click)="logout()">Logout</button>
      </ng-container>
      <ng-template #loggedOut>
        <p>Please <a routerLink="/login">login</a>.</p>
      </ng-template>
    </section>
  `
})
export class ProfileComponent {
  user: User | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getProfile();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
