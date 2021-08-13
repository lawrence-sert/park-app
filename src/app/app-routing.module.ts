import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "src/app/guards/auth.guard";
import { IntroGuard } from 'src/app/guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then( m => m.SignInPageModule),
    canLoad: [IntroGuard] // Check if we should show the introduction or forward to inside
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
    loadChildren: () => import('./auth/dashboard/dashboard.module').then( m => m.DashboardPageModule) // Secure all child pages
  },

  //to remove
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./auth/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'create-basket',
    loadChildren: () => import('./client/pages/create-basket/create-basket.module').then( m => m.CreateBasketPageModule)
  },
  {
    path: 'market',
    loadChildren: () => import('./client/pages/market/market.module').then( m => m.MarketPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./auth/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./legal/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./legal/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'cookie',
    loadChildren: () => import('./legal/cookie/cookie.module').then( m => m.CookiePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./auth/intro/intro.module').then( m => m.IntroPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
