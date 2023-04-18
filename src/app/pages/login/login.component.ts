import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData ={
    username : "",
    password :""
  }

  constructor(private loginService : LoginService , private snack : MatSnackBar , private router : Router) { }

  ngOnInit(): void {
  }


  formSubmit(){
    //validation

    //**username

    if(this.loginData.username.trim()=="" || this.loginData.username==null){

       this.snack.open("username is required","",{
        duration : 3000,
        verticalPosition : "top",
        horizontalPosition :"right"
       })

       return;
    }

    //**password 

    if(this.loginData.password.trim()==""|| this.loginData.password==null){

      this.snack.open("password is required","",{
        duration:3000,
        verticalPosition : "top",
        horizontalPosition:"right"
      })

      return;
    }
     
    
    //calling login services

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
         
          console.log(data);

          //**login user after generating token */

          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe(
            (user:any)=>{
               this.loginService.setUserDetails(user);
                  console.log(user);
               /*redirecting user to respective dasboards as per the role of the user: ADMIN or NORMAL */

              if(this.loginService.getUserRole()=="ADMIN"){

                //ADMIN dashboard
           
               this.router.navigate(["admin-dashboard"]);
               this.loginService.isLoggedInStatusSubject.next(true);

              }else if(this.loginService.getUserRole()=="NORMAL"){

                //NORMAL dashboard
               
                this.router.navigate(["user-dashboard"]);
                this.loginService.isLoggedInStatusSubject.next(true);

              }else{
                this.loginService.logout();
                this.snack.open("INVALID CREDENTIALS!! Try Again","",{
                  duration : 3000,
                  verticalPosition : "top",
                  horizontalPosition :"right"
                })
              }

            },
            (error)=>{

              console.log(error);

            }
          )
      },
      (error)=>{
        console.log(error);
      }
    )
   }
  }
