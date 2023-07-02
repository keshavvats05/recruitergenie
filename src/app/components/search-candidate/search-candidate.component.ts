import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.css']
})
export class SearchCandidateComponent implements OnInit {
  
  result:boolean=false
  _id:any=" ";
  // candidateDB: any;
  constructor(private router:Router,
    private http:HttpClient){}
    delCan:boolean=false;
    isSubmitted:boolean=false
    filteredCandidate:any[]=[]
    client:any=[]
    postForm!:FormGroup
    postSkills!:FormGroup
    currency:string='rupee'
    searchedCandidate: any
  skills:any=['Angular','Mean Stack,','Node.js']
  suggSkills:any=['Mean Stack, Developer' , 'Mean' , 'Mern Stack' , 'Express' , 'Full Stack']
  candidates=[
   {candidateName:'Sarthak k',exp:6,salary:3000000,candidateInterviewStatus :'Shortlisted', appliedDate:'20 May,2023',jobType:'All',location:'Mumbai',jobRole:'Frontend Developer'},
   {candidateName:'Raj Sharma',exp:5,salary:3000000,candidateInterviewStatus :'Interviewed', appliedDate:'20 May,2023',jobType:'Full-Time',location:'Mumbai',jobRole:'Backend Developer'},
   {candidateName:'Pranav vats',exp:10,salary:4000000,candidateInterviewStatus :'Inreview', appliedDate:'20 May,2023', jobType:'Part-Time',location:'Pune',jobRole:'Angular Developer'},
   {candidateName:'Sachin kumar',exp:1,salary:1000000,candidateInterviewStatus :'Hired', appliedDate:'20 May,2023', jobType:'Advisory',location:'Bangalore',jobRole:'Node.js Developer'},
   {candidateName:'Manoj kumar',exp:9,salary:5000000,candidateInterviewStatus :'Shortlisted', appliedDate:'20 May,2023', jobType:'Full-time',location:'Pune',jobRole:'Angular Developer'},
   {candidateName:'Priyanshu jha',exp:15,salary:6000000,candidateInterviewStatus :'Interviewed', appliedDate:'20 May,2023', jobType:'All',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Simran kaur',exp:7,salary:3500000,candidateInterviewStatus :'Inreview', appliedDate:'20 May,2023', jobType:'Part-Time',location:'Pune',jobRole:'Backend Developer'},
   {candidateName:'Priyanka k',exp:3,salary:4500000,candidateInterviewStatus :'Shortlisted', appliedDate:'20 May,2023', jobType:'Advisory',location:'Mumbai',jobRole:'Node.js Developer'},
   {candidateName:'Keshav vats',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Full-Time',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Mayank singh',exp:6,salary:4000000,candidateInterviewStatus :'Inreview', appliedDate:'20 june,2023', jobType:'All',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Rajesh kumar',exp:6,salary:4000000,candidateInterviewStatus :'Interviewed', appliedDate:'20 june,2023', jobType:'All',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Ujwal Pandey',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'All',location:'Bangalore',jobRole:'Backend Developer'},
   {candidateName:'Sangita kumari',exp:6,salary:4000000,candidateInterviewStatus :'Inreview', appliedDate:'20 May,2023', jobType:'Advisory',location:'Bangalore',jobRole:'Backend Developer'},
   {candidateName:'Ujwal Mishra',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Advisory',location:'Bangalore',jobRole:'Backend Developer'},
   {candidateName:'Anurag kumar',exp:6,salary:4000000,candidateInterviewStatus :'Inreview', appliedDate:'20 May,2023', jobType:'Contract',location:'Bangalore',jobRole:'Backend Developer'},
   {candidateName:'Ajay singh',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Contract',location:'Bangalore',jobRole:'Backend Developer'},
   {candidateName:'Anurag Mishra',exp:6,salary:4000000,candidateInterviewStatus :'Inreview', appliedDate:'20 May,2023', jobType:'All',location:'Bangalore',jobRole:'Backend Developer'},
   {candidateName:'Prabhakar singh',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Full-Time',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Arjun raj',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Full-Time',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Abhishek kumar',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Part-Time',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Aakash kumar',exp:6,salary:4000000,candidateInterviewStatus :'Inreview', appliedDate:'20 june,2023', jobType:'Part-Time',location:'Bangalore',jobRole:'Frontend Developer'},
   {candidateName:'Abhinash mishra',exp:6,salary:4000000,candidateInterviewStatus :'Hired', appliedDate:'20 june,2023', jobType:'Part-Time',location:'Bangalore',jobRole:'Frontend Developer'},


  ]
  jobType:string='All'
  allJobType:any=['Full-Time','Part-Time','Advisory','Contract']
  currentPage = 1;
  itemsPerPage = 10;

  yrsValue: number =5;
yrsHighValue:number=25;

value: number =1000000;
highValue:number=6000000;


ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });


  this.initForm()
  
}


private initForm(){
    this.postForm=new FormGroup({
      'curLocation' :new FormControl(null),
      'jobRole':new FormControl(null)
    })
   
  }


onSubmit(){
  this.searchedCandidate=[]
   const formData={
 skills:this.skills,
 value:this.value,
 highValue:this.highValue,
 expValue:this.yrsValue,
 highExpValue:this.yrsHighValue,
 location:this.postForm.value.curLocation,
 jobRole:this.postForm.value.jobRole,
 jobType:this.jobType
   }
   console.log(formData)

  console.log(this.candidates.length)
  for (let i = 0; i< this.candidates.length;i++){
 if (this.candidates[i].exp >= formData.expValue && this.candidates[i].exp <= formData.highExpValue){
  this.searchedCandidate.push(this.candidates[i])
 }
  }
  console.log(this.searchedCandidate)
  const len=this.searchedCandidate.length
  console.log(len)
  let expFilteredCandidates = [...this.searchedCandidate]
  const salaryFilterdCandidates:any[]=[]
  let locationFilteredCandidates:any[]=[]
  let jobRoleFilteredCandidates:any[]=[]
  let jobTypeFilteredCandidates:any[]=[]
  for (let i = 0; i<len;i++){
    console.log(expFilteredCandidates[i])
    console.log(expFilteredCandidates[i].salary,formData.value,formData.highValue)
    if (expFilteredCandidates[i].salary >= formData.value && expFilteredCandidates[i].salary <= formData.highValue){
      console.log('match')
      salaryFilterdCandidates.push(expFilteredCandidates[i])
    }
    else{
      console.log(' no match')
     }
   
    
     }
     console.log(salaryFilterdCandidates)
    
if (formData.location){
  for (let i=0; i< salaryFilterdCandidates.length; i++){
    console.log(salaryFilterdCandidates[i].location.toLowerCase(),formData.location.trim().toLowerCase())
    if (salaryFilterdCandidates[i].location.toLowerCase() == formData.location.trim().toLowerCase()){
      console.log(salaryFilterdCandidates[i])
      locationFilteredCandidates.push(salaryFilterdCandidates[i])
    }
  }

}
else{
  locationFilteredCandidates = [...salaryFilterdCandidates]
}
  console.log(locationFilteredCandidates)
    
  if (formData.jobRole){
    for (let i=0; i< locationFilteredCandidates.length; i++){
      console.log(locationFilteredCandidates[i].jobRole.toLowerCase(),formData.jobRole.trim().toLowerCase())
      if (locationFilteredCandidates[i].jobRole.toLowerCase() == formData.jobRole.trim().toLowerCase()){
        console.log(locationFilteredCandidates[i])
        jobRoleFilteredCandidates.push(locationFilteredCandidates[i])
      }
    }
  
  }
  else{
    jobRoleFilteredCandidates = [...locationFilteredCandidates]
  }
    console.log(jobRoleFilteredCandidates)
    if (formData.jobType){
      for (let i=0; i< jobRoleFilteredCandidates.length; i++){
        console.log(jobRoleFilteredCandidates[i].jobType.toLowerCase(),formData.jobType.trim().toLowerCase())
        if (jobRoleFilteredCandidates[i].jobType.toLowerCase() == formData.jobType.trim().toLowerCase()){
          console.log(jobRoleFilteredCandidates[i])
          jobTypeFilteredCandidates.push(jobRoleFilteredCandidates[i])
        }
      }
    
    }
    else{
      jobTypeFilteredCandidates = [...jobRoleFilteredCandidates]
    }
      console.log(jobTypeFilteredCandidates)
    this.filteredCandidate=[...jobTypeFilteredCandidates]
  this.isSubmitted=true
 }

onDeleteKeyword(id:number){
  this.skills.splice(id,1)
}
deleteCandidate(id:number){
this.filteredCandidate.splice(id,1)
}
onLogout(){
  localStorage.clear()
  this.router.navigate(['/login'])
  
}

}
