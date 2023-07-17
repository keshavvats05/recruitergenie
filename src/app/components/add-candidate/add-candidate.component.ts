import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  isSubmitted!:boolean
  constructor(private router:Router,
    private http:HttpClient){}
  postForm!:FormGroup
  yrsValue: number =5;
  yrsHighValue:number=25;  
  value: number =1000000;
  highValue:number=6000000;
  onLogout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  private initForm(){
    this.postForm=new FormGroup({
      'candidateName':new FormControl(null,Validators.required),
      'curLocation' :new FormControl(null),
      'jobRole':new FormControl(null),
      'jobType':new FormControl('Full-Time'),
      'hiringStage':new FormControl('Inreview'),
      'salary':new FormControl(null),
      'experience':new FormControl(null)
    })
   
  }
  ngOnInit(): void {
    this.initForm()
  }
  onSubmit(){
    if(!this.postForm.valid){
      alert("Invalid Data")
      return
    }
    this.isSubmitted=true
    const formData={
      candidateName:this.postForm.value.candidateName,
      jobRole:this.postForm.value.jobRole,
      currentLocation:this.postForm.value.curLocation,
      jobType:this.postForm.value.jobType,
      hiringStage:this.postForm.value.hiringStage,
      experience:this.postForm.value.experience,
      salary:this.postForm.value.salary
    }
    console.log(formData)
    let apiUrl="https://recruitergenie-d69f4-default-rtdb.firebaseio.com/candidates.json"
    this.http.post(apiUrl,formData) .subscribe((response:any)=>{
   console.log(response)
    })
    this.postForm.reset()
  }

  onClose(){
    this.isSubmitted=false
  }
}
