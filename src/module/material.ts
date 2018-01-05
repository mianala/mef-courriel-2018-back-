import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatDatepickerModule, MatSnackBarModule,
  MatNativeDateModule, MatInputModule, MatSidenavModule, MatListModule, MatTooltipModule, MatSelectModule,
  MatChipsModule, MatExpansionModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule
  ]
})
export class MaterialModule {
}
