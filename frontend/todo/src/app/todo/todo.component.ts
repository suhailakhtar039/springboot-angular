import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, DatePipe, NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  id!: number;
  todo!: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());

    if (this.id != -1) {
      this.todoService
        .retrieveTodo('in28minutes', this.id)
        .subscribe((response) => {
          this.todo = response;
          // console.log(response);
        });
    }
  }

  saveTodo() {
    if (this.id == -1) {
      // create todo
      this.todoService
        .createTodo('in28minutes', this.todo)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['todos']);
        });
    } else {
      this.todoService
        .updateTodo('in28minutes', this.id, this.todo)
        .subscribe((data) => {
          // console.log(data);
          this.router.navigate(['todos']);
        });
    }
  }
}
