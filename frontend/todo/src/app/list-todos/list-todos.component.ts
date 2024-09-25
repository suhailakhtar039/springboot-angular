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
  todo = {
    id: 1,
    description: 'Learn to Dance',
  };
}
