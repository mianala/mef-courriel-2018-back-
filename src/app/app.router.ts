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
import {ThreadsComponent} from "./threads/threads/threads.component";
import {ProjectsComponent} from "./projects/projects/projects.component";
import {ReportsComponent} from "./reports/reports/reports.component";
import {EntityPageComponent} from "./entities/entity-page/entity-page.component";
import {UpdateComponent} from "./user/update/update.component";
import {TemplatePageComponent} from "./template-page/template-page.component";
import {ProfilComponent} from "./user/profil/profil.component";
import {BeComponent} from "./print/be/be.component";

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
          component: ProjectListComponent,
        },
        {
          path: 'courriel',
          component: ProjectPageComponent,
        },
      ]
    },
    {
      path: 'envoyes',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: ThreadsComponent,
        }
      ]
    },
    {
      path: 'enregistres',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: ProjectsComponent,
        }
      ]
    },
    {
      path: 'profile',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: ProfilComponent
        },
        {
          path: 'mis-a-jour',
          component: UpdateComponent,
        }
      ]
    },
    {
      path: 'entite',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: EntityPageComponent,
        }
      ]
    },
    {
      path: 'rapports',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: ReportsComponent,
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
      path: 'templates',
      component: TemplatePageComponent,
    },
    {
      path: 'BE',
      component: BeComponent,
    },
    {
      path: 'public',
      children: [
        {
          path: '',
          component: LoginPageComponent,
        },
      ]
    }
  ]
;

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
