import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MasonryModule} from 'angular2-masonry';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {PublicHomeComponent} from './public/public-home/public-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPageComponent} from './public/public-login-page/login-page.component';
import {SignUpPageComponent} from './public/public-sign-up-page/sign-up-page.component';
import {routes} from './app.router';
import {UserSidenavComponent} from './user/user-sidenav/user-sidenav.component';
import {UserToolbarComponent} from './app-user/user-toolbar/user-toolbar.component';
import {UserHomeComponent} from './user/user-home/user-home.component';
import {UserHomeContainerComponent} from './user/user-home-container/user-home-container.component';
import {UserSidenavProfilComponent} from './user/user-sidenav-profil/user-sidenav-profil.component';
import {UserSidenavTimeComponent} from './user/user-sidenav-time/user-sidenav-time.component';
import {UserSidenavMailmenuComponent} from './user/user-sidenav-mailmenu/user-sidenav-mailmenu.component';
import {UserSidenavUsermenuComponent} from './user/user-sidenav-usermenu/user-sidenav-usermenu.component';
import {EmailComponent} from './flow/email/email.component';
import {EmailMenuButtonComponent} from './flow/email-menu-button/email-menu-button.component';
import {EmailPageComponent} from './flow/email-page/email-page.component';
import {EmailsPageComponent} from './flow/emails-page/emails-page.component';
import {EmailPhotoComponent} from './flow/email-photo/email-photo.component';
import {EmailFileComponent} from './flow/email-file/email-file.component';
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
import {AvatarComponent} from './avatar/avatar.component';
import {EmailsFabComponent} from './user/emails-fab/emails-fab.component';
import {DialogWriteEmailComponent} from './dialog/dialog-write-email/dialog-write-email.component';
import {UserBoxComponent} from './app-user/user-box/user-box.component';
import {UserAutocompleteComponent} from './app-user/user-autocomplete/user-autocomplete.component';
import {DialogFileuploadComponent} from './dialog/dialog-fileupload/dialog-fileupload.component';
import {SessionRouterComponent} from './session-directory/session-router/session-router.component';
import {EmailRouterComponent} from './flow/email-router/email-router.component';
import {UsersPageComponent} from './app-user/users-page/users-page.component';
import {UserPageComponent} from './app-user/user-page/user-page.component';
import {UserComponent} from './app-user/user/user.component';
import {UserAvatarComponent} from './app-user/user-avatar/user-avatar.component';
import {
  UsersEntitiesLeadDepartementsComponent
} from './app-user/users-entities-lead-departements/users-entities-lead-departements.component';
import {UsersEntitiesDepartementsComponent} from './app-user/users-entities-departements/users-entities-departements.component';
import {DialogTransferMailComponent} from './dialog/dialog-transfer-mail/dialog-transfer-mail.component';
import {DialogWriteToComponent} from './dialog/dialog-write-to/dialog-write-to.component';
import {UserService} from './user.service';
import {User} from '../models/User';
import {FlowService} from './flow.service';
import {SocketService} from './service/socket.service';
import {Email} from '../models/Email';
import {Flow} from '../models/Flow';
import {EmailMessageComponent} from './flow/email-message/email-message.component';
import {EmailService} from './email.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NotificationService} from './notification.service';
import {DialogFileComponent} from './dialog/dialog-file/dialog-file.component';
import {FilesComponent} from './files/files.component';
import {UploadButtonComponent} from './upload-button/upload-button.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {FroalaService} from './froala.service';
import {SafehtmlPipe} from './safehtml.pipe';
import {EntityService} from './entity.service';
import {EntityFilterComponent} from './entity/entity-filter/entity-filter.component';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';
import {GlobalService} from './global.service';
import {TestService} from './test.service';
import {TransferService} from './transfer.service';
import {TransferButtonComponent} from './menu/transfer-button/transfer-button.component';
import {DeleteButtonComponent} from './menu/delete-button/delete-button.component';
import {ReportComponent} from './dialog/report/report.component';
import {NoMailComponent} from './util/no-mail/no-mail.component';
import {FlowComponent} from './menu/flow/flow.component';
import {SavedComponent} from './menu/saved/saved.component';
import {MessageComponent} from './menu/message/message.component';
import {ArchiveComponent} from './menu/archive/archive.component';
import {XhrService} from './service/xhr.service';
import {ReportService} from './service/report.service';
import {MaterialModule} from '../module/material';
import {ObservationsComponent} from './form/observations/observations.component';
import {EntitiesComponent} from './form/entities/entities.component';
import {ProjectNavComponent} from './sidenav/project-nav/project-nav.component';
import {ProjectListComponent} from './projects/project-list/project-list.component';
import {ProjectComponent} from './projects/project/project.component';
import {ProjectPageComponent} from './projects/project-page/project-page.component';
import {ThreadComponent} from './projects/thread/thread.component';
import {DispatchComponent} from './projects/dialog/dispatch/dispatch.component';
import {ProjectService} from './projects/project.service';
import {DialogSaveProjectComponent} from './dialog/dialog-save-project/dialog-save-project.component';
import {ThreadService} from "./thread/thread.service";
import { FileComponent } from './file/file.component';
import { AnswerComponent } from './dialog/answer/answer.component';
import {MessageService} from "./message.service";

@NgModule({
  declarations: [
    AppComponent,
    PublicHomeComponent,
    LoginPageComponent,
    SignUpPageComponent,
    UserSidenavComponent,
    UserToolbarComponent,
    UserHomeComponent,
    UserHomeContainerComponent,
    UserSidenavProfilComponent,
    UserSidenavTimeComponent,
    UserSidenavMailmenuComponent,
    UserSidenavUsermenuComponent,
    EmailComponent,
    EmailMenuButtonComponent,
    EmailPageComponent,
    EmailsPageComponent,
    EmailPhotoComponent,
    EmailFileComponent,
    UserHomeDashboardComponent,
    SessionsPageComponent,
    SessionPageComponent,
    SessionComponent,
    SessionMenuButtonComponent,
    SessionMembersComponent,
    SessionMembersUserComponent,
    SessionMessageboxComponent,
    SessionMessageComponent,
    SessionFileComponent,
    AvatarComponent,
    EmailsFabComponent,
    DialogWriteEmailComponent,
    UserBoxComponent,
    UserAutocompleteComponent,
    DialogFileuploadComponent,
    SessionRouterComponent,
    EmailRouterComponent,
    UsersPageComponent,
    UserPageComponent,
    UserComponent,
    UserAvatarComponent,
    UsersEntitiesLeadDepartementsComponent,
    UsersEntitiesDepartementsComponent,
    DialogSaveProjectComponent,
    DialogTransferMailComponent,
    DialogWriteToComponent,
    EmailMessageComponent,
    DialogFileComponent,
    FilesComponent,
    UploadButtonComponent,
    SafehtmlPipe,
    EntityFilterComponent,
    AvatarUploadComponent,
    TransferButtonComponent,
    DeleteButtonComponent,
    ReportComponent,
    NoMailComponent,
    FlowComponent,
    SavedComponent,
    MessageComponent,
    ArchiveComponent,
    ObservationsComponent,
    EntitiesComponent,
    ProjectNavComponent,
    ProjectListComponent,
    ProjectComponent,
    ProjectPageComponent,
    ThreadComponent,
    DispatchComponent,
    FileComponent,
    AnswerComponent,
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
    DialogSaveProjectComponent,
    DispatchComponent,
    DialogWriteToComponent,
    AnswerComponent,
    DialogTransferMailComponent,
    DialogWriteEmailComponent,
    ReportComponent
  ],
  providers: [UserService,
    TestService,
    SocketService,
    ReportService,
    MessageService,
    ThreadService,
    XhrService,
    GlobalService,
    TransferService,
    EntityService, FroalaService, ProjectService,
    NotificationService, User, Flow, EmailService, FlowService, Email],
  bootstrap: [AppComponent]
})
export class AppModule {
}
