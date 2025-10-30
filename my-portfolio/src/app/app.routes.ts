import { Routes } from '@angular/router';
import { WymonComponent } from './components/wymon.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'projects/wymon', component: WymonComponent },
];