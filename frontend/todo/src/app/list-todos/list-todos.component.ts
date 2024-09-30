import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';

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
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [];
  message: string = '';

  // [
  //   new Todo(1, 'Learn to dance', false, new Date()),
  //   new Todo(2, 'Become expert in angular', false, new Date()),
  //   new Todo(3, 'Visit India', false, new Date()),
  //   // { id: 1, description: 'Learn to Dance' },
  //   // { id: 2, description: 'Become expert in angular' },
  //   // { id: 3, description: 'Visit India' },
  // ];

  constructor(private todoService: TodoDataService) {}
  ngOnInit(): void {
    this.todoService.retrieveAllTodos('suhail-from-list-todos').subscribe(
      (response) => {
        // console.log(response);
        this.todos = response;
      },
      (err) => {
        console.log('in error in list todos');
      }
    );
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('suhail-from-list-todos').subscribe(
      (response) => {
        // console.log(response);
        this.todos = response;
      },
      (err) => {
        console.log('in error in list todos');
      }
    );
  }

  deleteTodo(id: number) {
    // console.log('this todo ' + id);
    this.todoService.deleteTodo('suhail akhtar', id).subscribe((response) => {
      // console.log('within the subscribe');
      // console.log(response);
      this.message = `Delete of todo ${id} successful`;
      this.refreshTodos();
    });

    // console.log(`Delete todo invoked having id ${id}`);
  }

  updateTodo(id: number) {
    console.log(`update ${id}`);
  }
}
