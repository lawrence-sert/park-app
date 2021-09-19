import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { IntroGuard } from 'src/app/auth/guards/intro.guard';
import { AutoLoginGuard } from 'src/app/auth/guards/auto-login.guard';

const routes: Routes = [
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},

// authentication pages 
{
  path: 'sign-in',
  loadChildren: () => import('src/app/auth/sign-in/sign-in.module').then( m => m.SignInPageModule),
  canLoad: [IntroGuard, AutoLoginGuard] // Check if we should show the introduction or forward to inside
},
{
  path: 'sign-up',
  loadChildren: () => import('src/app/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
},
{
  path: 'forgot-password',
  loadChildren: () => import('src/app/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
},
{
  path: 'verify-email',
  loadChildren: () => import('src/app/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
},
{
  path: 'dashboard',
  loadChildren: () => import('src/app/auth/dashboard/dashboard.module').then( m => m.DashboardPageModule),
  canActivate: [AuthGuard] // Secure all child pages
},
{
  path: 'info',
  loadChildren: () => import('src/app/auth/info/info.module').then( m => m.InfoPageModule)
},
{
  path: 'settings',
  loadChildren: () => import('src/app/auth/settings/settings.module').then( m => m.SettingsPageModule)
},
{
  path: 'intro',
  loadChildren: () => import('src/app/auth/intro/intro.module').then( m => m.IntroPageModule)
},

//clents pages
{
  path: 'create-basket',
  loadChildren: () => import('src/app/client/pages/create-basket/create-basket.module').then( m => m.CreateBasketPageModule)
},
{
  path: 'basket/:basketID',
  loadChildren: () => import('src/app/client/pages/basket/basket.module').then( m => m.BasketPageModule)
},
{
  path: 'market',
  loadChildren: () => import('src/app/client/pages/market/market.module').then( m => m.MarketPageModule)
},
{
  path: 'recipe/:recipeID',
  loadChildren: () => import('src/app/client/pages/recipe/recipe.module').then( m => m.RecipePageModule)
},
{
  path: 'product/:productID',
  loadChildren: () => import('src/app/client/pages/product/product.module').then( m => m.ProductPageModule)
},
{
  path: 'post/:postID',
  loadChildren: () => import('src/app/client/pages/post/post.module').then( m => m.PostPageModule)
},
{
  path: 'postcat/:postCatID',
  loadChildren: () => import('src/app/client/pages/postcat/postcat.module').then( m => m.PostcatPageModule)
},
{
  path: 'messaging',
  loadChildren: () => import('src/app/client/pages/messaging/messaging.module').then( m => m.MessagingPageModule)
},
{
  path: 'chef/:chefID',
  loadChildren: () => import('src/app/client/pages/chef/chef.module').then( m => m.ChefPageModule)
},
{
  path: 'tips',
  loadChildren: () => import('src/app/client/pages/tips/tips.module').then( m => m.TipsPageModule)
},
{
  path: 'tip/:tipID',
  loadChildren: () => import('src/app/client/pages/tip/tip.module').then( m => m.TipPageModule)
},

//legal pages
{
  path: 'privacy',
  loadChildren: () => import('src/app/legal/privacy/privacy.module').then( m => m.PrivacyPageModule)
},
{
  path: 'terms',
  loadChildren: () => import('src/app/legal/terms/terms.module').then( m => m.TermsPageModule)
},
{
  path: 'cookie',
  loadChildren: () => import('src/app/legal/cookie/cookie.module').then( m => m.CookiePageModule)
},
{
  path: 'add-basket',
  loadChildren: () => import('src/app/client/modals/add-basket/add-basket.module').then( m => m.AddBasketPageModule)
},
{
  path: 'image-up',
  loadChildren: () => import('./auth/image-up/image-up.module').then( m => m.ImageUpPageModule)
},
{
  path: 'notifications',
  loadChildren: () => import('src/app/client/pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
},
{
  path: 'comment',
  loadChildren: () => import('src/app/client/modals/comment/comment.module').then( m => m.CommentPageModule)
},
{
  path: 'info',
  loadChildren: () => import('./auth/info/info.module').then( m => m.InfoPageModule)
},
{
  path: 'phone',
  loadChildren: () => import('./auth/phone/phone.module').then( m => m.PhonePageModule)
},
{
  path: 'post-options',
  loadChildren: () => import('./client/modals/post-options/post-options.module').then( m => m.PostOptionsPageModule)
},
{
  path: 'add-points',
  loadChildren: () => import('./client/modals/add-points/add-points.module').then( m => m.AddPointsPageModule)
},
{
  path: 'combo/:comboID',
  loadChildren: () => import('./client/pages/combo/combo.module').then( m => m.ComboPageModule)
}


];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
