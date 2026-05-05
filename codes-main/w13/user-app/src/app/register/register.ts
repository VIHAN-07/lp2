import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {

  name     = '';
  email    = '';
  mobile   = '';
  dob      = '';
  city     = '';
  address  = '';
  password = '';
  error    = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (this.name.length < 3)              { this.error = 'Name min 3 chars'; return; }
    if (!this.email.includes('@'))         { this.error = 'Invalid email'; return; }
    if (!/^[0-9]{10}$/.test(this.mobile)) { this.error = 'Mobile must be 10 digits'; return; }
    if (this.password.length < 6)          { this.error = 'Password min 6 chars'; return; }

    const result = this.auth.register({
      name: this.name, email: this.email,
      mobile: this.mobile, dob: this.dob,
      city: this.city, address: this.address,
      password: this.password
    });

    if (result === 'exists') { this.error = 'Name already taken'; return; }

    alert('Registered!');
    this.router.navigate(['/login']);
  }
}
