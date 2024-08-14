import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sac',
  templateUrl: './sac.component.html',
  styleUrls: ['./sac.component.css']
})
export class SacComponent {

constructor(
  private httpClient: HttpClient
){}

contatoForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.email, Validators.required]),
  message: new FormControl('', Validators.required)
});

onSubmit() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  const body = new HttpParams()
    .set('name', this.contatoForm.get('name')?.value || '')
    .set('email', this.contatoForm.get('email')?.value || '')
    .set('message', this.contatoForm.get('message')?.value || '');

  this.httpClient.post('https://formsubmit.io/felipe.f.amorim@outlook.com', body.toString(), { headers })
    .subscribe(
      response => console.log("Response:", response),      
    );

  this.contatoForm.reset
}

// onSubmit(){
//   this.httpClient.post('https://formsubmit.co/send/felipe.f.amorim@outlook.com', this.contatoForm.value)
//     .subscribe(
//       (response) => console.log("Response:", response), (error) => console.log("Error:", error));
// }

}
