import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Wildcard route for 404s
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: false, // Keep this false for clean URLs
    enableTracing: false 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }