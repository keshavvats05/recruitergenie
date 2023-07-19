import { Component, EventEmitter,Input,Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
@Input() editMode!:boolean
constructor(private router:Router){}
@Output() close =new EventEmitter<void>();
onClose(){
this.close.emit();
if (this.editMode)
  this.router.navigate(['/searchCandidate'])
}


}
