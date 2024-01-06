import { AuthGuard } from './auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent, EmailLayoutComponent } from './containers';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'apps/email',
    component: EmailLayoutComponent,

    children: [
     
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),

      },

      {
        path: 'student',
        loadChildren: () => import('./views/student/student.module').then((m)=>m.StudentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contracts',
        loadChildren: () => import('./views/contract/contract.module').then((m) => m.ContractModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./views/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./views/service-provided/service-provided.module').then((m) => m.ServiceProvidedModule)
      },
      {
        path: 'sale',
        loadChildren: () => import('./views/sale/sale.module').then((m) => m.SaleModule)
      },
      {
        path: 'cash-register',
        loadChildren: () => import('./views/cash-register/cash-register.module').then((m) => m.CashRegisterModule)
      },
      
    ]
  },
  // {
  //   path: '404',
  //   component: Page404Component,
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   component: Page500Component,
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
