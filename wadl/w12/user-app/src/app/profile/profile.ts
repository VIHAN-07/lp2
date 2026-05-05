import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html'
})
export class ProfileComponent {

  user: any = {};

  constructor(private router: Router) {

    if (typeof window !== 'undefined') {   // ✅ IMPORTANT FIX
      this.user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

      if (!localStorage.getItem("loggedInUser")) {
        this.router.navigate(['/login']);
      }
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("loggedInUser");
    }
    this.router.navigate(['/login']);
  }
}