import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.css']
})
export class SearchCandidateComponent implements OnInit {
  onSerachCandidate!:boolean
  result:boolean=false
  _id:any=" ";
  apiUrl!:string
  // candidateDB: any;
  constructor(private router:Router,
    private http:HttpClient){}
    delCan:boolean=false;
    isSubmitted:boolean=false
    filteredCandidate:any[]=[]
    client:any=[]
    postForm!:FormGroup
    currency:string='rupee'
    searchedCandidate: any
  candidates:any=[]  
  jobType:string='Full-Time'
  allJobType:any=['Full-Time','Part-Time','Advisory','Contract']
  currentPage = 1;
  itemsPerPage = 10;

  yrsValue: number =2;
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
  this.onSerachCandidate=true

  this.apiUrl = "https://recruitergenie-d69f4-default-rtdb.firebaseio.com/candidates.json";
  this.http.get(this.apiUrl).subscribe((res: any) => {
    this.onSerachCandidate=false
    this.result=true
    console.log(res);
    const postArray = Object.keys(res).map(key => ({ ...res[key], id: key }));
    console.log(postArray);
    this.candidates=postArray
    console.log(this.candidates)
    this.searchCandidates()

  });

  this.isSubmitted=true
 }
 searchCandidates(){
  this.searchedCandidate=[]
  const formData={
value:this.value,
highValue:this.highValue,
expValue:this.yrsValue,
highExpValue:this.yrsHighValue,
currentLocation:this.postForm.value.curLocation,
jobRole:this.postForm.value.jobRole,
jobType:this.jobType
  }
  console.log(formData)

 console.log(this.candidates.length)
 for (let i = 0; i< this.candidates.length;i++){
if (this.candidates[i].experience >= formData.expValue && this.candidates[i].experience <= formData.highExpValue){
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
   
if (formData.currentLocation){
 for (let i=0; i< salaryFilterdCandidates.length; i++){
   console.log(salaryFilterdCandidates[i].currentLocation.toLowerCase().trim(),formData.currentLocation.trim().toLowerCase())
   if (salaryFilterdCandidates[i].currentLocation
    .toLowerCase().trim() == formData.currentLocation.trim().toLowerCase()){
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
}


deleteCandidate(id:number){
  let apiUrl = "https://recruitergenie-d69f4-default-rtdb.firebaseio.com/candidates/";
  console.log(apiUrl+this.filteredCandidate[id].id+'.json')
this.http.delete(apiUrl+this.filteredCandidate[id].id+'.json').subscribe((res)=>{
  console.log((res))
})
this.filteredCandidate.splice(id,1)

}

onLogout(){
  localStorage.clear()
  this.router.navigate(['/login'])
  
}
onAddCandidate(){
  this.router.navigate(['/addCandidate'])
}
getTotalPages(): number {
  const totalPages = Math.ceil(this.filteredCandidate.length / this.itemsPerPage);
  return totalPages;
}

}
