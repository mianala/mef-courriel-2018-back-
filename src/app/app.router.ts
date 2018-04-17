/**
 * Created by Loharano on 6/30/2017.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './public/public-login-page/login-page.component';
import {UserHomeDashboardComponent} from './user/user-home-dashboard/user-home-dashboard.component';
import {UsersPageComponent} from './app-user/users-page/users-page.component';
import {UserPageComponent} from './app-user/user-page/user-page.component';
import {ProjectListComponent} from './page/inbox/inbox.component';
import {ProjectPageComponent} from './projects/project-page/project-page.component';
import {ThreadsComponent} from "./threads/threads.component";
import {ReportsComponent} from "./reports/reports/reports.component";
import {EntityPageComponent} from "./entities/entity-page/entity-page.component";
import {UpdateComponent} from "./user/update/update.component";
import {TemplatePageComponent} from "./page/template-page/template-page.component";
import {ProfilComponent} from "./user/profil/profil.component";
import {BeComponent} from "./print/be/be.component";
import {ShippedPageComponent} from "./page/shipped-page/shipped-page.component";
import {ReturnedPageComponent} from "./page/returned-page/returned-page.component";
import {SavedComponent} from "./menu/saved/saved.component";
import {DispatchedPageComponent} from "./page/dispatched-page/dispatched-page.component";

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
      path: 'exportes',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: ShippedPageComponent,
        }
      ]
    },
    {
      path: 'importes',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: ReturnedPageComponent,
        }
      ]
    },
    {
      path: 'enregistres',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: SavedComponent,
        }
      ]
    },
    {
      path: 'dispatches',
      // component: SessionRouterComponent,
      children: [
        {
          path: '',
          component: DispatchedPageComponent,
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
