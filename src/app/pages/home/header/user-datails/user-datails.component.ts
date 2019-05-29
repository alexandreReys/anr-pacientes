import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/security/login/login.service';
import { User } from 'src/app/security/login/user.model';

@Component({
  selector: 'app-user-datails',
  templateUrl: './user-datails.component.html',
  styleUrls: ['./user-datails.component.css']
})
export class UserDatailsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  };

  user(): User {
    return this.loginService.user;
  };

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  };

  login() {
    this.loginService.handleLogin();
  };

  logout(){
    this.loginService.logout();
  };

};
