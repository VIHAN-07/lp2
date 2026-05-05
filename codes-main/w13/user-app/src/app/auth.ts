import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private pid: Object) {}

  getUsers(): any[] {
    if (!isPlatformBrowser(this.pid)) return [];
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  register(user: any): string {
    const users = this.getUsers();
    if (users.find((u: any) => u.name === user.name)) return 'exists';
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return 'ok';
  }

  login(username: string, password: string): boolean {
    const user = this.getUsers().find((u: any) =>
      (u.name === username || u.email === username) && u.password === password
    );
    if (user) {
      localStorage.setItem('current', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getUser(): any {
    if (!isPlatformBrowser(this.pid)) return null;
    return JSON.parse(localStorage.getItem('current') || 'null');
  }

  deleteUser(i: number): void {
    const users = this.getUsers();
    users.splice(i, 1);
    localStorage.setItem('users', JSON.stringify(users));
  }

  logout(): void {
    localStorage.removeItem('current');
  }
}
