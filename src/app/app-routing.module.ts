// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'account', component: AccountComponent },
  //{ path: '', redirectTo: '/landing', pathMatch: 'full' }, // Default route
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
