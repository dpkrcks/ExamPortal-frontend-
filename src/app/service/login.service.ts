import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedInStatusSubject = new Subject<boolean>();

  constructor(private http : HttpClient) { }

 //Login service: generate token.

  public generateToken(loginData : any){
     
    return  this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //method to extract current user details

  public getCurrentUser(){
       return this.http.get(`${baseUrl}/current-user`);
  }


  //login user: set token to the local storage
  public loginUser(token:any){

     localStorage.setItem("token",token);
     return true;
  }

  //isLoggedIn: method to check if user is logged in
  public isLoggedIn(){

     let tokenStr = localStorage.getItem("token");
     if(tokenStr==undefined || tokenStr==""|| tokenStr==null){
      return false;
     }else{
      return true;
     }
  }


  //logout: to removethe token from the local storage
 public logout(){

   localStorage.removeItem("token");
   localStorage.removeItem("user");
   return true;
 }


 //gettoken: method to get token
 public getToken(){
  return localStorage.getItem("token");
 }

//setUserDetails: save the user details in the local storage
public setUserDetails(user:any){

   localStorage.setItem("user",JSON.stringify(user));
   return true;
}

//getUserDetails:to get user details from the user
public getUserDetails(){

  let user = localStorage.getItem("user");

  if(user!=null){

    return JSON.parse(user);
  } else{
    this.logout();
    return null;
  }
 
}

//userRole
public getUserRole(){
    let user = this.getUserDetails();
    return user.authorities[0].authority;
}

}
