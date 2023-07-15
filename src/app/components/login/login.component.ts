import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  result:boolean=true
  registeredPerson!:string
  getTabName(registeredPerson:string){
this.registeredPerson=registeredPerson
  }
  constructor(private authService:AuthService,
    private router:Router){}
    ngOnInit(): void {
  
    }
  error:string="";

  onSubmit(form:NgForm){
    if (!form.valid){
      this.error='Invalid Credentials'
      return
    }
    this.result=false
    const email=form.value.email;
    const password=form.value.password;
    let authObs:Observable<AuthResponseData>;   
    authObs= this.authService.login(email,password);
    authObs.subscribe(
      resData=>{
        this.result=true
        console.log(resData);
        this.router.navigate(['/searchCandidate'])
      },
      errorMessage=>{
        this.result=true
        console.log(errorMessage);
        this.error=errorMessage;
      }
    );
    form.resetForm();
  }
}
