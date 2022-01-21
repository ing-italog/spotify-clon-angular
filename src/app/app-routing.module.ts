import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomepageComponent } from '@modules/home/pages/homepage/homepage.component';

const routes: Routes = [
{
  path:'auth',//http://localhost:4200/home/dashboard
  loadChildren:() => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
},
{
  path:'',//http://localhost:4200/home/dashboard
  component: HomepageComponent,
  loadChildren:() => import(`./modules/home/home.module`).then(m => m.HomeModule),
  canActivate:[SessionGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
