import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  constructor(
    private hardcodedAuthenticatedService: HardcodedAuthenticationService
  ) {}

  ngOnInit(): void {
    this.hardcodedAuthenticatedService.logout();
  }
}
