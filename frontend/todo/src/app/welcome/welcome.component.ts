import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  message = 'some welcome message';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.message);
    console.log(this.route.snapshot.params['name']);
  }
}
