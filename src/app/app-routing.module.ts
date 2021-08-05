import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "src/app/guard/auth.guard";
import { IntroGuard } from 'src/app/guard/intro.guard';
import { AutoLoginGuard } from 'src/app/guard/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./auth/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

  //to remove
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./auth/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./auth/info/info.module').then( m => m.InfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
