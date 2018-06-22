import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatDatepickerModule, MatSnackBarModule,
  MatNativeDateModule, MatInputModule, MatSidenavModule, MatListModule, MatTooltipModule, MatSelectModule,
  MatChipsModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatTabsModule, MatDialogModule, MatButtonToggleModule
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
    MatButtonToggleModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatRadioModule,
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
