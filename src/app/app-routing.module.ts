import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SearchCandidateComponent } from './components/search-candidate/search-candidate.component';
import { AuthGuard } from './services/auth-guard';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';

const routes: Routes = [
  { path:'home', component:LandingPageComponent},
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'register' ,component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'searchCandidate', component:SearchCandidateComponent,
  canActivate :[AuthGuard]
},
{path:'addCandidate', component:AddCandidateComponent,
canActivate :[AuthGuard]
}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
