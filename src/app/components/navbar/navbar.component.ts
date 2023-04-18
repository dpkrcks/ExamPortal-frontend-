import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user : any;

  constructor(private loginService : LoginService , private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUserDetails();
    this.loginService.isLoggedInStatusSubject.asObservable().subscribe((data)=>{

      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUserDetails();
    }

    )

  }

  public logout(){

    this.loginService.logout();
    window.location.reload();
  }

}
