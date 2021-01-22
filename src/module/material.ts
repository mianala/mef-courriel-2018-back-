import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select'
import {MatCardModule} from '@angular/material/card'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatStepperModule} from '@angular/material/stepper'
import {MatTabsModule} from '@angular/material/tabs'
import {MatRadioModule} from '@angular/material/radio'
import {MatListModule} from '@angular/material/list'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatChipsModule} from '@angular/material/chips'
import {MatDialogModule} from '@angular/material/dialog'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu'
import {MatSidenavModule} from '@angular/material/sidenav'


@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonToggleModule,
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
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
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
