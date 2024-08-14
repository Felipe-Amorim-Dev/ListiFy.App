import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SigninGuard {
    
    constructor(
        private router: Router
    ) {
    }

    canActivate() {
       
        const auth = sessionStorage.getItem('auth_usuario');
        if(auth != null) {
            this.router.navigate(['/main']);
            return false;
        }
        else {
            return true;
        }
    }
}