import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email = "";
  password = "";

  constructor(private router: Router) { }

  login() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    if (found) {
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      this.router.navigate(['/profile']);
    } else {
      alert("Invalid credentials");
    }
  }
}