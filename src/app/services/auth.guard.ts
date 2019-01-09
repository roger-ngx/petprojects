import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private route: Router){}

  canActivate(){
    const user = localStorage.getItem('user');

    if(user == null){
      this.route.navigate(['']);
      return false;
    }

    return true;
  }
}
