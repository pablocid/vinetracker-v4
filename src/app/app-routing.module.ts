import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: './pages/welcome/welcome.module#WelcomePageModule'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'selection',
    loadChildren: './pages/selection/selection.module#SelectionPageModule'
  },
  {
    path: 'row',
    loadChildren: './pages/row/row.module#RowPageModule'
  },
  { path: 'assess', loadChildren: './pages/assess/assess.module#AssessPageModule' },
  { path: 'attribute', loadChildren: './pages/attribute/attribute.module#AttributePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
