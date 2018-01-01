import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
  {
    path: 'details', component: DetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes  )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
