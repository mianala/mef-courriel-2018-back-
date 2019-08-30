/**
 * Created by Loharano on 6/30/2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './public/public-login-page/login-page.component';
import { UserHomeDashboardComponent } from './user/user-home-dashboard/user-home-dashboard.component';
import { ProjectListComponent } from './page/inbox/inbox.component';
import { ProjectPageComponent } from './projects/project-page/project-page.component';
import { SentComponent } from "./page/sent/sent.component";
import { EntityPageComponent } from "./entities/entity-page/entity-page.component";
import { UpdateComponent } from "./user/update/update.component";
import { TemplatePageComponent } from "./page/template-page/template-page.component";
import { ProfilComponent } from "./user/profil/profil.component";
import { BeComponent } from "./form/be/be.component";
import { SavedComponent } from "./page/saved/saved.component";
import { TreatedComponent } from "./page/treated/treated.component";
import { TreatedProjectComponent } from "./page/treated-project/treated-project.component";
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { SearchPageComponent } from './page/search-page/search-page.component';

export const router: Routes = [

  {
    path: '',
    component: ProjectsPageComponent,
  },
  {
    path: 'courriels',
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      {
        path: 'courriel',
        component: ProjectPageComponent,
        data: { title: '' }
      },
    ]
  },
  {
    path: 'traites',
    children: [
      {
        path: '',
        component: TreatedComponent,
      }
    ]
  },
  {
    path: 'recherche',
    children: [
      {
        path: '',
        component: SearchPageComponent,
      }
    ]
  },
  {
    path: 'envoyes',
    children: [
      {
        path: '',
        component: SentComponent,
      }
    ]
  },
  {
    path: 'projets',
    children: [
      {
        path: 'nouveaux',
        component: SavedComponent,
      },
      {
        path: 'tous',
        component: ProjectsPageComponent,
      },
      {
        path: 'traites',
        component: TreatedProjectComponent,
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
    children: [
      {
        path: '',
        component: EntityPageComponent,
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
