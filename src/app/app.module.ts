import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MasonryModule} from 'angular2-masonry';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {PublicHomeComponent} from './public/public-home/public-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPageComponent} from './public/public-login-page/login-page.component';
import {routes} from './app.router';
import {UserSidenavComponent} from './user/user-sidenav/user-sidenav.component';
import {UserToolbarComponent} from './app-user/user-toolbar/user-toolbar.component';
import {UserSidenavProfilComponent} from './user/user-sidenav-profil/user-sidenav-profil.component';
import {UserSidenavTimeComponent} from './user/user-sidenav-time/user-sidenav-time.component';
import {UserHomeDashboardComponent} from './user/user-home-dashboard/user-home-dashboard.component';
import {SessionsPageComponent} from './session-directory/sessions-page/sessions-page.component';
import {SessionPageComponent} from './session-directory/session-page/session-page.component';
import {SessionComponent} from './session-directory/session/session.component';
import {SessionMenuButtonComponent} from './session-directory/session-menu-button/session-menu-button.component';
import {SessionMembersComponent} from './session-directory/session-members/session-members.component';
import {SessionMembersUserComponent} from './session-directory/session-members-user/session-members-user.component';
import {SessionMessageboxComponent} from './session-directory/session-messagebox/session-messagebox.component';
import {SessionMessageComponent} from './session-directory/session-message/session-message.component';
import {SessionFileComponent} from './session-directory/session-file/session-file.component';
import {AvatarComponent} from './app-user/avatar/avatar.component';
import {UserBoxComponent} from './app-user/user-box/user-box.component';
import {UserAutocompleteComponent} from './app-user/user-autocomplete/user-autocomplete.component';
import {SessionRouterComponent} from './session-directory/session-router/session-router.component';
import {UsersPageComponent} from './app-user/users-page/users-page.component';
import {UserPageComponent} from './app-user/user-page/user-page.component';
import {UserComponent} from './app-user/user/user.component';
import {UserAvatarComponent} from './app-user/user-avatar/user-avatar.component';
import {
  UsersEntitiesLeadDepartementsComponent
} from './app-user/users-entities-lead-departements/users-entities-lead-departements.component';
import {UsersEntitiesDepartementsComponent} from './app-user/users-entities-departements/users-entities-departements.component';
import {UserService} from './service/user.service';
import {User} from '../models/User';
import {FlowService} from './service/flow.service';
import {SocketService} from './service/socket.service';
import {Email} from '../models/Email';
import {Flow} from '../models/Flow';
import {EmailService} from './service/email.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NotificationService} from './service/notification.service';
import {DialogFileComponent} from './dialog/dialog-file/dialog-file.component';
import {FilesComponent} from './files/files.component';
import {UploadButtonComponent} from './upload-button/upload-button.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {FroalaService} from './service/froala.service';
import {SafehtmlPipe} from './safehtml.pipe';
import {EntityService} from './service/entity.service';
import {EntityFilterComponent} from './entities/entity-filter/entity-filter.component';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';
import {GlobalService} from './service/global.service';
import {TestService} from './service/test.service';
import {TransferService} from './service/transfer.service';
import {ReportComponent} from './dialog/report/report.component';
import {NoMailComponent} from './util/no-mail/no-mail.component';
import {FlowComponent} from './menu/flow/flow.component';
import {SavedComponent} from './page/saved/saved.component';
import {ArchiveComponent} from './menu/archive/archive.component';
import {XhrService} from './service/xhr.service';
import {ReportService} from './service/report.service';
import {MaterialModule} from '../module/material';
import {ObservationsComponent} from './form/observations/observations.component';
import {EntitiesComponent} from './form/entities/entities.component';
import {ProjectNavComponent} from './sidenav/project-nav/project-nav.component';
import {ProjectListComponent} from './page/inbox/inbox.component';
import {ProjectComponent} from './projects/project/project.component';
import {ProjectPageComponent} from './projects/project-page/project-page.component';
import {DispatchComponent} from './projects/dialog/dispatch/dispatch.component';
import {ProjectService} from './service/project.service';
import {ThreadService} from "./service/thread.service";
import { FileComponent } from './files/file/file.component';
import {ReplyComponent} from './dialog/reply/reply.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { SentComponent } from './page/sent/sent.component';
import { ReportItemComponent } from './reports/report-item/report-item.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { EntityPageComponent } from './entities/entity-page/entity-page.component';
import { FlowsComponent } from './flows/flows.component';
import { TemplatePageComponent } from './page/template-page/template-page.component';
import { ExportComponent } from './dialog/export/export.component';
import { DecommissionComponent } from './dialog/decommission/decommission.component';
import { ShareComponent } from './dialog/share/share.component';
import { UpdateComponent } from './user/update/update.component';
import { SendComponent } from './dialog/send/send.component';
import { BeComponent } from './form/be/be.component';
import { ProfilComponent } from './user/profil/profil.component';
import { SearchComponent } from './filter/search/search.component';
import { DirectionComponent } from './filter/direction/direction.component';
import {FilterService} from "./service/filter.service";
import { ShippedPageComponent } from './page/shipped-page/shipped-page.component';
import { ReturnedPageComponent } from './page/returned-page/returned-page.component';
import {TemplateService} from "./service/template.service";
import { DispatchedPageComponent } from './page/dispatched-page/dispatched-page.component';
import {DialogSaveProjectComponent} from "./dialog/save-import/dialog-save-project.component";
import {EnvService} from "./service/env.service";
import { TreatedComponent } from './page/treated/treated.component';
import { TreatedProjectComponent } from './page/treated-project/treated-project.component';
import {ComposeComponent} from "./dialog/compose/compose.component";
import { AllProjectsComponent } from './page/all-projects/all-projects.component';
import { LoadingButtonComponent } from './util/loading-button/loading-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicHomeComponent,
    LoginPageComponent,
    UserSidenavComponent,
    UserToolbarComponent,
    UserSidenavProfilComponent,
    UserSidenavTimeComponent,
    UserHomeDashboardComponent,
    SessionsPageComponent,
    SessionPageComponent,
    SessionComponent,
    SessionMenuButtonComponent,
    SessionMembersComponent,
    SessionMembersUserComponent,
    SessionMessageboxComponent,
    DialogSaveProjectComponent,
    SessionMessageComponent,
    SessionFileComponent,
    AvatarComponent,
    ComposeComponent,
    UserBoxComponent,
    UserAutocompleteComponent,
    SessionRouterComponent,
    UsersPageComponent,
    UserPageComponent,
    UserComponent,
    UserAvatarComponent,
    UsersEntitiesLeadDepartementsComponent,
    UsersEntitiesDepartementsComponent,
    DialogFileComponent,
    FilesComponent,
    UploadButtonComponent,
    SafehtmlPipe,
    EntityFilterComponent,
    AvatarUploadComponent,
    ReportComponent,
    NoMailComponent,
    FlowComponent,
    SavedComponent,
    ArchiveComponent,
    ObservationsComponent,
    EntitiesComponent,
    ProjectNavComponent,
    ProjectListComponent,
    ProjectComponent,
    ProjectPageComponent,
    DispatchComponent,
    FileComponent,
    ReplyComponent,
    ProjectsComponent,
    SentComponent,
    ReportItemComponent,
    ReportsComponent,
    EntityPageComponent,
    FlowsComponent,
    TemplatePageComponent,
    ExportComponent,
    DecommissionComponent,
    ShareComponent,
    UpdateComponent,
    SendComponent,
    BeComponent,
    ProfilComponent,
    SearchComponent,
    DirectionComponent,
    ShippedPageComponent,
    ReturnedPageComponent,
    DispatchedPageComponent,
    TreatedComponent,
    TreatedProjectComponent,
    AllProjectsComponent,
    LoadingButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MasonryModule,
    ReactiveFormsModule,
    routes
  ],
  entryComponents: [
    DispatchComponent,
    ReplyComponent,
    DialogSaveProjectComponent,
    ComposeComponent,
    ReportComponent,
    SendComponent,
    DecommissionComponent,
    ExportComponent,
    ShareComponent
  ],
  providers: [UserService,
    TestService,
    SocketService,
    ReportService,
    ThreadService,
    EnvService,
    TemplateService,
    XhrService,
    FilterService,
    {provide:LOCALE_ID, useValue:'fr-FR'},
    GlobalService,
    TransferService,
    EntityService, FroalaService, ProjectService,
    NotificationService, User, Flow, EmailService, FlowService, Email],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// some comment
