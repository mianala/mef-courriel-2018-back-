import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicHomeComponent } from './public/public-home/public-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './public/public-login-page/login-page.component';
import { routes } from './app.router';
import { UserSidenavComponent } from './user/user-sidenav/user-sidenav.component';
import { UserSidenavProfilComponent } from './user/user-sidenav-profil/user-sidenav-profil.component';
import { UserSidenavTimeComponent } from './user/user-sidenav-time/user-sidenav-time.component';
import { UserHomeDashboardComponent } from './user/user-home-dashboard/user-home-dashboard.component';
import { SessionsPageComponent } from './session-directory/sessions-page/sessions-page.component';
import { SessionPageComponent } from './session-directory/session-page/session-page.component';
import { SessionComponent } from './session-directory/session/session.component';
import { SessionMenuButtonComponent } from './session-directory/session-menu-button/session-menu-button.component';
import { SessionMembersComponent } from './session-directory/session-members/session-members.component';
import { SessionMembersUserComponent } from './session-directory/session-members-user/session-members-user.component';
import { SessionMessageboxComponent } from './session-directory/session-messagebox/session-messagebox.component';
import { SessionMessageComponent } from './session-directory/session-message/session-message.component';
import { SessionFileComponent } from './session-directory/session-file/session-file.component';
import { AvatarComponent } from './app-user/avatar/avatar.component';
import { UserBoxComponent } from './app-user/user-box/user-box.component';
import { SessionRouterComponent } from './session-directory/session-router/session-router.component';
import { UserAvatarComponent } from './app-user/user-avatar/user-avatar.component';
import { UserService } from './service/user.service';
import { User } from '../models/User';
import { FlowService } from './service/flow.service';
import { SocketService } from './service/socket.service';
import { Flow } from '../models/Flow';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationService } from './service/notification.service';
import { DialogFileComponent } from './dialog/dialog-file/dialog-file.component';
import { FilesComponent } from './files/files.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';
import { SafehtmlPipe } from './safehtml.pipe';
import { EntityService } from './service/entity.service';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { GlobalService } from './service/global.service';
import { TestService } from './service/test.service';
import { NoMailComponent } from './util/no-mail/no-mail.component';
import { FlowComponent } from './menu/flow/flow.component';
import { SavedComponent } from './page/saved/saved.component';
import { XhrService } from './service/xhr.service';
import { MaterialModule } from '../module/material';
import { ObservationsComponent } from './form/observations/observations.component';
import { EntitiesComponent } from './form/entities/entities.component';
import { ProjectNavComponent } from './sidenav/project-nav/project-nav.component';
import { InboxComponent } from './page/inbox/inbox.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectPageComponent } from './projects/project-page/project-page.component';
import { DispatchComponent } from './projects/dialog/dispatch/dispatch.component';
import { ProjectService } from './service/project.service';
import { ThreadService } from './service/thread.service';
import { FileComponent } from './files/file/file.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { SentComponent } from './page/sent/sent.component';
import { ReportItemComponent } from './reports/report-item/report-item.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { EntityPageComponent } from './entities/entity-page/entity-page.component';
import { FlowsComponent } from './flows/flows.component';
import { TemplatePageComponent } from './page/template-page/template-page.component';
import { UpdateComponent } from './user/update/update.component';
import { BeComponent } from './form/be/be.component';
import { ProfilComponent } from './user/profil/profil.component';
import { SearchComponent } from './filter/search/search.component';
import { DirectionComponent } from './filter/direction/direction.component';
import { FilterService } from './service/filter.service';
import { ShippedPageComponent } from './page/shipped-page/shipped-page.component';
import { ReturnedPageComponent } from './page/returned-page/returned-page.component';
import { TemplateService } from './service/template.service';
import { DispatchedPageComponent } from './page/dispatched-page/dispatched-page.component';
import { DialogSaveProjectComponent } from './dialog/save-import/dialog-save-project.component';
import { EnvService } from './service/env.service';
import { TreatedComponent } from './page/treated/treated.component';
import { TreatedProjectComponent } from './page/treated-project/treated-project.component';
import { ComposeComponent } from './dialog/compose/compose.component';
import { LoadingButtonComponent } from './util/loading-button/loading-button.component';
import { MatPaginatorIntl } from '@angular/material';
import { SaveFormComponent } from './form/save-form/save-form.component';
import { UpdateProjectComponent } from './dialog/update-project/update-project.component';
import { EditProjectComponent } from './dialog/edit-project/edit-project.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { ToolbarComponent } from './parts/toolbar/toolbar.component';
import { ProjectsPageComponent } from './page/projects-page/projects-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReceiversComponent } from './form/receivers/receivers.component';
import { ManageUserPageComponent } from './page/manage-user-page/manage-user-page.component';
import { AddUserComponent } from './form/add-user/add-user.component';
import { UsersPageComponent } from './page/users-page/users-page.component';
import { UserComponent } from './user/user/user.component';
import { EntityComponent } from './component/entity/entity.component';
import { FiltersComponent } from './form/filters/filters.component';
import { FoldersComponent } from './page/folders/folders.component';
import { SenderComponent } from './form/sender/sender.component';
import { StatusComponent } from './page/status/status.component';
import { PrintDialogComponent } from './dialog/print-dialog/print-dialog.component';
import { SuiviComponent } from './dialog/suivi/suivi.component';

registerLocaleData(localeFr);

const socket_config = { url: EnvService.ip(), options: {} };


export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'articles par page';
  nextPageLabel = 'Page suivante';
  previousPageLabel = 'Page précédente';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 sur ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' sur ' + length;
  };

}


@NgModule({
  declarations: [
    AppComponent,
    PublicHomeComponent,
    LoginPageComponent,
    UserSidenavComponent,
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
    SessionRouterComponent,
    UserAvatarComponent,
    DialogFileComponent,
    FilesComponent,
    UploadButtonComponent,
    SafehtmlPipe,
    AvatarUploadComponent,
    NoMailComponent,
    FlowComponent,
    SavedComponent,
    ObservationsComponent,
    EntitiesComponent,
    ProjectNavComponent,
    InboxComponent,
    ProjectComponent,
    ProjectPageComponent,
    DispatchComponent,
    FileComponent,
    ProjectsComponent,
    SentComponent,
    ReportItemComponent,
    ReportsComponent,
    EntityPageComponent,
    FlowsComponent,
    TemplatePageComponent,
    UpdateComponent,
    BeComponent,
    ProfilComponent,
    SearchComponent,
    DirectionComponent,
    ShippedPageComponent,
    ReturnedPageComponent,
    DispatchedPageComponent,
    TreatedComponent,
    TreatedProjectComponent,
    LoadingButtonComponent,
    SaveFormComponent,
    UpdateProjectComponent,
    EditProjectComponent,
    SearchPageComponent,
    ToolbarComponent,
    ProjectsPageComponent,
    ReceiversComponent,
    ManageUserPageComponent,
    AddUserComponent,
    UsersPageComponent,
    UserComponent,
    EntityComponent,
    FiltersComponent,
    FoldersComponent,
    SenderComponent,
    StatusComponent,
    PrintDialogComponent,
    SuiviComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    routes
  ],
  entryComponents: [
    DispatchComponent,
    DialogSaveProjectComponent,
    ComposeComponent,
    SuiviComponent,
    EditProjectComponent,
  ],
  providers: [UserService,
    TestService,
    SocketService,
    ThreadService,
    EnvService,
    TemplateService,
    XhrService,
    FilterService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    {
      provide: LOCALE_ID, useValue: 'fr-FR'
    },
    GlobalService,
    EntityService, ProjectService,
    NotificationService, User, Flow, FlowService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// some comment
