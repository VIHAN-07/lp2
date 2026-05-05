import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userKey = 'w13-user';
  private readonly loginKey = 'w13-logged-in';

  register(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    localStorage.setItem(this.loginKey, 'false');
  }

  login(email: string, password: string): boolean {
    const user = this.getUser();
    if (!user) {
      return false;
    }

    const match =
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password;

    localStorage.setItem(this.loginKey, match ? 'true' : 'false');
    return match;
  }

  logout(): void {
    localStorage.setItem(this.loginKey, 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loginKey) === 'true';
  }

  getProfile(): User | null {
    if (!this.isLoggedIn()) {
      return null;
    }

    return this.getUser();
  }

  private getUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
