import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard {
    
    constructor(
        private router: Router
    ) {
    }

    canActivate() {           
        const auth = sessionStorage.getItem('auth_usuario');
        if(auth != null) {
            
            const data = JSON.parse(auth);
            if(data.accessToken != null) {
                const dataHoraAcesso = new Date();
                const dataHoraExpiracao = new Date(data.dataHoraExpiracao as Date);
                return dataHoraAcesso <= dataHoraExpiracao;                
            }
            else{                
                sessionStorage.clear();
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