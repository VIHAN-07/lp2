import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // ✅ ADD THIS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],   // ✅ ADD HERE
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  newTask: string = "";
  tasks: any[] = [];

  addTask() {
    if (this.newTask.trim() === "") return;

    this.tasks.push({
      name: this.newTask,
      editing: false
    });

    this.newTask = "";
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(index: number) {
    this.tasks[index].editing = true;
  }

  saveTask(index: number) {
    this.tasks[index].editing = false;
  }
}