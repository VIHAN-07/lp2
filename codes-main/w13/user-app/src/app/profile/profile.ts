import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  current: any   = null;
  users:   any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.current = this.auth.getUser();
    if (!this.current) { this.router.navigate(['/login']); return; }
    this.users = this.auth.getUsers();
  }

  delete(i: number) {
    this.auth.deleteUser(i);
    this.users = this.auth.getUsers();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
