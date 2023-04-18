import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack : MatSnackBar) { }

  public user ={
    username:"",
    password:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:""
  }

  ngOnInit(): void {
  }

  formSubmit(){
   console.log(this.user);

   if(this.user.username==""|| this.user.username==null){
    this.snack.open("Username is Required","",{
      duration : 3000,
      verticalPosition : "top",
      horizontalPosition :"right",
    })
    return;
   }

   //add user to database

    this.userService.addUser(this.user).subscribe( 
      (data)=>{
        //success
        console.log(data);
        this.snack.open("User is registered successfully" ,"",{
          duration : 3000,
          horizontalPosition : "right",
          verticalPosition : "top"
        })
      },
      (error)=>{

        //on failure
        console.log(error);

        this.snack.open("Something Went Wrong" , "",{
          duration : 3000,
          verticalPosition : "top",
          horizontalPosition : "right"
        })
      }
       
    )


  }

}
