import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EncryptedStorageService } from "./EncryptData";

@Injectable({
    providedIn: 'root'
})
export class SigninGuard {
    
    constructor(
        private router: Router,
        private encrypt: EncryptedStorageService
    ) {}

    canActivate() {
       
        const auth = this.encrypt.getItem('auth_usuario');
        if(auth != null) {
            this.router.navigate(['/main']);
            return false;
        }
        else {
            return true;
        }
    }
}