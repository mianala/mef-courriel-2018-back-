/**
 * Created by Loharano on 6/30/2017.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './public-login-page/login-page.component';
import {SignUpPageComponent} from './public-sign-up-page/sign-up-page.component';
import {PublicHomeComponent} from './public-home/public-home.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {EmailsPageComponent} from './emails-page/emails-page.component';
import {EmailPageComponent} from './email-page/email-page.component';
import {UserHomeDashboardComponent} from './user-home-dashboard/user-home-dashboard.component';
import {SessionsPageComponent} from './sessions-page/sessions-page.component';
import {SessionPageComponent} from './session-page/session-page.component';
import {EmailRouterComponent} from "./email-router/email-router.component";
import {SessionRouterComponent} from "./session-router/session-router.component";
import {UsersPageComponent} from "./users-page/users-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {SavedEmailsPageComponent} from "./saved-emails-page/saved-emails-page.component";
import {SavedEmailPageComponent} from "./saved-email-page/saved-email-page.component";

export const router: Routes = [

    {
      path: '',
      component: UserHomeDashboardComponent,
    },
    {
      path: 'courriels',
      // component: EmailRouterComponent,
      children: [
        {
          path: '',
          component: EmailsPageComponent,
        },
        {
          path: 'courriel',
          component: EmailPageComponent,
        },
      ]
    },
    {
      path: 'sessions',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: SessionsPageComponent,
        },
        {
          path: 'session',
          component: SessionPageComponent,
        }
      ]
    },
    {
      path: 'utilisateurs',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: UsersPageComponent,
        },
        {
          path: ':id',
          component: UserPageComponent,
        }
      ]
    },
    {
      path: 'enregistres',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: SavedEmailsPageComponent,
        },
        {
          path: 'enregistre',
          component: SavedEmailPageComponent,
        }
      ]
    },
    {
      path: 'public',
      component: PublicHomeComponent
    },
    {
      path: 'connexion',
      component: LoginPageComponent
    }
    ,
    {
      path: 's-inscrire',
      component: SignUpPageComponent
    }
  ]
;

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
