import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {PublicHomeComponent} from './public-home/public-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPageComponent} from './public-login-page/login-page.component';
import {SignUpPageComponent} from './public-sign-up-page/sign-up-page.component';
import {routes} from './app.router';
import {UserSidenavComponent} from './user-sidenav/user-sidenav.component';
import {UserToolbarComponent} from './user-toolbar/user-toolbar.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserHomeContainerComponent} from './user-home-container/user-home-container.component';
import {UserSidenavProfilComponent} from './user-sidenav-profil/user-sidenav-profil.component';
import {UserSidenavTimeComponent} from './user-sidenav-time/user-sidenav-time.component';
import {UserSidenavMailmenuComponent} from './user-sidenav-mailmenu/user-sidenav-mailmenu.component';
import {UserSidenavUsermenuComponent} from './user-sidenav-usermenu/user-sidenav-usermenu.component';
import {EmailComponent} from './email/email.component';
import {EmailMenuButtonComponent} from './email-menu-button/email-menu-button.component';
import {EmailPageComponent} from './email-page/email-page.component';
import {EmailsPageComponent} from './emails-page/emails-page.component';
import {EmailPhotoComponent} from './email-photo/email-photo.component';
import {EmailFileComponent} from './email-file/email-file.component';
import {UserHomeDashboardComponent} from './user-home-dashboard/user-home-dashboard.component';
import {SessionsPageComponent} from './sessions-page/sessions-page.component';
import {SessionPageComponent} from './session-page/session-page.component';
import {SessionComponent} from './session/session.component';
import {SessionMenuButtonComponent} from './session-menu-button/session-menu-button.component';
import {SessionMembersComponent} from './session-members/session-members.component';
import {SessionMembersUserComponent} from './session-members-user/session-members-user.component';
import {SessionMessageboxComponent} from './session-messagebox/session-messagebox.component';
import {SessionMessageComponent} from './session-message/session-message.component';
import {SessionFileComponent} from './session-file/session-file.component';
import {AvatarComponent} from './avatar/avatar.component';
import {EmailsFabComponent} from './emails-fab/emails-fab.component';
import {DialogWriteEmailComponent} from './dialog-write-email/dialog-write-email.component';
import {UserBoxComponent} from './user-box/user-box.component';
import {UserAutocompleteComponent} from './user-autocomplete/user-autocomplete.component';
import {DialogFileuploadComponent} from './dialog-fileupload/dialog-fileupload.component';
import {SessionRouterComponent} from './session-router/session-router.component';
import {EmailRouterComponent} from './email-router/email-router.component';
import {UsersPageComponent} from './users-page/users-page.component';
import {UserPageComponent} from './user-page/user-page.component';
import {UserComponent} from './user/user.component';
import {UserAvatarComponent} from './user-avatar/user-avatar.component';
import {UsersEntitiesLeadDepartementsComponent} from './users-entities-lead-departements/users-entities-lead-departements.component';
import {UsersEntitiesDepartementsComponent} from './users-entities-departements/users-entities-departements.component';
import {DialogSaveMailComponent} from './dialog-save-mail/dialog-save-mail.component';
import {SavedEmailComponent} from './saved-email/saved-email.component';
import {SavedEmailPageComponent} from './saved-email-page/saved-email-page.component';
import {SavedEmailsPageComponent} from './saved-emails-page/saved-emails-page.component';
import {DialogTransferMailComponent} from './dialog-transfer-mail/dialog-transfer-mail.component';
import {DialogWriteToComponent} from './dialog-write-to/dialog-write-to.component';
import {UserService} from './user.service';
import {User} from "../models/User";
import {FlowService} from "./flow.service";
import {Email} from "../models/Email";
import {Flow} from "../models/Flow";
import {EmailMessageComponent} from './email-message/email-message.component';
import {EmailService} from "./email.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NotificationService} from "./notification.service";

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
    DialogSaveMailComponent,
    SavedEmailComponent,
    SavedEmailPageComponent,
    SavedEmailsPageComponent,
    DialogTransferMailComponent,
    DialogWriteToComponent,
    EmailMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    routes
  ],
  entryComponents: [
    DialogSaveMailComponent,
    DialogWriteToComponent,
    DialogWriteEmailComponent
  ],
  providers: [UserService,NotificationService, User, Flow, EmailService, FlowService, Email],
  bootstrap: [AppComponent]
})
export class AppModule {
}
