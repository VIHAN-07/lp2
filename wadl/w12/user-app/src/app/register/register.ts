import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  user: any = {};

  constructor(private router: Router) { }

  register() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      alert("All fields required");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // ❌ prevent duplicate email
    const exists = users.find((u: any) => u.email === this.user.email);
    if (exists) {
      alert("User already exists!");
      return;
    }

    users.push(this.user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered!");
    this.router.navigate(['/login']);
  }
}