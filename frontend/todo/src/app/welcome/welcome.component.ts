import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  message = 'some welcome message';
  name = '';

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit(): void {
    console.log(this.message);
    this.name = this.route.snapshot.params['name'];
    console.log(this.name);
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanService().subscribe((response) => {
      this.handleSuccessfulResponse(response);
    });
    console.log('last line of code');
  }

  handleSuccessfulResponse(response: any) {
    console.log(response);
  }
}
