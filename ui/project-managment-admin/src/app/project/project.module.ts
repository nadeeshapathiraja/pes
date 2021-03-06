import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectMainViewComponentComponent} from './project-main-view-component.component';
import {FormCreatorComponent} from './form-creator/form-creator.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {CreatePresentationDialogComponent} from './create-presentation-dialog/create-presentation-dialog.component';
import {ComponentsModule} from "../components/components.module";
import {AuthGuard} from "../auth/auth.guard";
import {StudentTableComponent} from './student-table/student-table.component';
import {PersonValidatorService} from "./services/person-validator.service";

const routes: Routes = [{
  path: ':id',
  children:
    [
      {path: '', component: ProjectMainViewComponentComponent, canActivate: [AuthGuard]},
      {path: 'students', component: StudentTableComponent, canActivate: [AuthGuard]},
      {
        path: 'presentation', loadChildren: '../presentation/presentation.module#PresentationModule'
      },

    ]
},]

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ComponentsModule,
    MatSortModule,
    MatPaginatorModule

  ],
  declarations: [ProjectMainViewComponentComponent, FormCreatorComponent, CreatePresentationDialogComponent, StudentTableComponent],
  exports: []
  ,
  entryComponents: [CreatePresentationDialogComponent],
  providers: [PersonValidatorService]
})
export class ProjectModule {
}
