import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  result!:boolean
  editCandidate:any=[]
  isSubmitted!:boolean
  id!:string;
  editMode!: boolean;
  constructor(private router:Router,
    private http:HttpClient,
    private actRoute:ActivatedRoute){}
  postForm!:FormGroup

  onLogout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  private initForm(){
    if (!this.editMode){
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
    if (this.editMode){
      console.log(this.editCandidate)
      this.postForm=new FormGroup({
        'candidateName':new FormControl(this.editCandidate.candidateName,Validators.required),
        'curLocation' :new FormControl(this.editCandidate.currentLocation),
        'jobRole':new FormControl(this.editCandidate.jobRole),
        'jobType':new FormControl(this.editCandidate.jobType),
        'hiringStage':new FormControl(this.editCandidate.hiringStage),
        'salary':new FormControl(this.editCandidate.salary),
        'experience':new FormControl(this.editCandidate.experience)
      })
    }

   
  }
  ngOnInit(): void {
    this.actRoute.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.editMode=params['id'] != null
      console.log(this.editMode)
      console.log(this.id)
  
    })
    if (this.editMode){
      const apiUrl='https://recruitergenie-d69f4-default-rtdb.firebaseio.com/candidates/'+this.id+'.json'
      console.log(apiUrl)
      this.http.get(apiUrl).subscribe((res:any)=>{
        this.editCandidate=res
        console.log(this.editCandidate)
        this.result=true
        this.initForm()
      })
    }
    else{
      this.result=true
      this.initForm()
    }
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
    if (!this.editMode){
      let apiUrl="https://recruitergenie-d69f4-default-rtdb.firebaseio.com/candidates.json"
      this.http.post(apiUrl,formData).subscribe((response:any)=>{
        console.log(response)
         })
    }
    else{
      let apiUrl='https://recruitergenie-d69f4-default-rtdb.firebaseio.com/candidates/'+this.id+'.json'
      console.log(apiUrl)
      this.http.put(apiUrl,formData).subscribe((response:any)=>{
        console.log(response)
      })
    }
    this.postForm.reset()
  }

  onClose(){
    this.isSubmitted=false
  }
}
