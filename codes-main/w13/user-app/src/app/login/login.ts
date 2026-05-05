import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error    = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) { this.error = 'All fields required'; return; }
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
