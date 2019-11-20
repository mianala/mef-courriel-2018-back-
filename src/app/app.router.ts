/**
 * Created by Loharano on 6/30/2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './public/public-login-page/login-page.component';
import { ProjectPageComponent } from './projects/project-page/project-page.component';
import { SentComponent } from "./page/sent/sent.component";
import { EntityPageComponent } from "./entities/entity-page/entity-page.component";
import { UpdateComponent } from "./user/update/update.component";
import { TemplatePageComponent } from "./page/template-page/template-page.component";
import { ProfilComponent } from "./user/profil/profil.component";
import { BeComponent } from "./form/be/be.component";
import { TreatedComponent } from "./page/treated/treated.component";
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { InboxComponent } from './page/inbox/inbox.component'
import { EntitiesComponent } from './form/entities/entities.component';
import { FoldersComponent } from './page/folders/folders.component';
import { StatusComponent } from './page/status/status.component';
export const router: Routes = [

  {
    path: '',
    component: ProjectsPageComponent,
  },
  {
    path: 'traites',
    component: TreatedComponent
  },
  {
    path: 'reçus',
    component: InboxComponent
  },
  {
    path: 'projet',
    component: ProjectPageComponent,
    data: { title: '' }
  },
  {
    path: 'recherche',
    component: SearchPageComponent,
  },
  {
    path: 'envoyes',
    component: SentComponent
  },
  {
    path: 'departements',
    component: EntitiesComponent
  },
  {
    path: 'doc/:id',
    component: StatusComponent
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
    path: 'departement',
    children: [
      {
        path: '',
        component: EntityPageComponent,
      }
    ]
  },
  {
    path: 'classeurs',
    children: [
      {
        path: '',
        component: FoldersComponent,
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
