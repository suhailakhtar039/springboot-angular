import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  standalone: true,
  imports: [NgIf, NgFor, UpperCasePipe, DatePipe],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css',
})
export class ListTodosComponent {
  todos = [
    new Todo(1, 'Learn to dance', false, new Date()),
    new Todo(2, 'Become expert in angular', false, new Date()),
    new Todo(3, 'Visit India', false, new Date()),
    // { id: 1, description: 'Learn to Dance' },
    // { id: 2, description: 'Become expert in angular' },
    // { id: 3, description: 'Visit India' },
  ];
}
