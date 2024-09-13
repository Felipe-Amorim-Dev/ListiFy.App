import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EncryptedStorageService } from "./EncryptData";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard {
    
    constructor(
        private router: Router,
        private encrypt: EncryptedStorageService
    ) {
    }

    canActivate() {           
        const auth = this.encrypt.getItem('auth_usuario');
        if(auth != null) {
            
            const data = auth;
            if(data.accessToken != null) {
                const dataHoraAcesso = new Date();
                const dataHoraExpiracao = new Date(data.dataHoraExpiracao as Date);
                return dataHoraAcesso <= dataHoraExpiracao;                
            }
            else{                
                this.encrypt.removeItem('auth_usuario');
                this.router.navigate(['/login']);
                return false;
            }
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}