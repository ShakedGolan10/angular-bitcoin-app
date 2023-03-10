import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { StatsComponent } from './cmps/stats/stats.component';
import { environment } from './environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { ContactResolver } from './services/contact.resolver';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { HomePageComponent } from './views/home-page/home-page.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  {
    path: 'contact', component: ContactIndexComponent, canActivate: [AuthGuard], children: [
      { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: ContactResolver } },
      { path: 'edit', component: ContactEditComponent }
    ]
  },
  { path: 'contact/:id', component: ContactDetailsComponent, resolve: { contact: ContactResolver } },
  { path: 'stats', component: StatsComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment?.production })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
