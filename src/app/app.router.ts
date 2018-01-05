/**
 * Created by Loharano on 6/30/2017.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './public/public-login-page/login-page.component';
import {SignUpPageComponent} from './public/public-sign-up-page/sign-up-page.component';
import {PublicHomeComponent} from './public/public-home/public-home.component';
import {UserHomeComponent} from './user/user-home/user-home.component';
import {EmailsPageComponent} from './flow/emails-page/emails-page.component';
import {EmailPageComponent} from './flow/email-page/email-page.component';
import {UserHomeDashboardComponent} from './user/user-home-dashboard/user-home-dashboard.component';
import {SessionsPageComponent} from './session-directory/sessions-page/sessions-page.component';
import {SessionPageComponent} from './session-directory/session-page/session-page.component';
import {UsersPageComponent} from './app-user/users-page/users-page.component';
import {UserPageComponent} from './app-user/user-page/user-page.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {ProjectComponent} from './projects/project/project.component';
import {ProjectPageComponent} from './projects/project-page/project-page.component';

export const router: Routes = [

    {
      path: '',
      component: UserHomeDashboardComponent,
    },
    {
      path: 'messages',
      // component: EmailRouterComponent,
      children: [
        {
          path: '',
          component: EmailsPageComponent,
        },
        {
          path: 'message',
          component: EmailPageComponent,
        },
      ]
    },
    {
      path: 'courriers',
      // component: EmailRouterComponent,
      children: [
        {
          path: '',
          component: ProjectListComponent,
        },
        {
          path: 'courrier',
          component: ProjectPageComponent,
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
      path: 'public',
      children: [
        {
          path: '',
          component: PublicHomeComponent,
        },
        {
          path: 'connexion',
          component: LoginPageComponent,
        },
        {
          path: 's-enregistrer',
          component: SignUpPageComponent,
        },
      ]
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
