import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-todos',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css',
})
export class ListTodosComponent {
  todos = [
    { id: 1, description: 'Learn to Dance' },
    { id: 2, description: 'Become expert in angular' },
    { id: 3, description: 'Visit India' },
  ];
}
