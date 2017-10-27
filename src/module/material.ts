import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatDatepickerModule, MatSnackBarModule,
  MatNativeDateModule, MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatSnackBarModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule {
}
