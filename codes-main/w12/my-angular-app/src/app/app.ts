import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  newTask   = '';
  editIndex = -1;
  editText  = '';
  tasks: string[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    }
  }

  save() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  add() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
      this.save();
    }
  }

  startEdit(i: number) {
    this.editIndex = i;
    this.editText  = this.tasks[i];
  }

  saveEdit() {
    if (this.editText.trim()) {
      this.tasks[this.editIndex] = this.editText.trim();
      this.save();
    }
    this.editIndex = -1;
    this.editText  = '';
  }

  delete(i: number) {
    this.tasks.splice(i, 1);
    this.save();
  }
}
