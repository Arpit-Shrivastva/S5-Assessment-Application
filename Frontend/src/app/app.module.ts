import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 🔧 Routing & Bootstrap
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 🧩 Guards & Services
import { RoleService } from './Guards/role.service';

// 📦 Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

// 📊 Charts
import { NgChartsModule } from 'ng2-charts';

// 🧱 App Components
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { NewEmployeeComponent } from './Components/new-employee/new-employee.component';
import { HeaderComponent } from './Components/header/header.component';
import { AdminDashComponent } from './Components/admin-dash/admin-dash.component';
import { ShiftDashComponent } from './Components/shift-dash/shift-dash.component';
import { OperatorDashComponent } from './Components/operator-dash/operator-dash.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';
import { NewAuditComponent } from './Components/new-audit/new-audit.component';
import { AuditChartComponent } from './Components/audit-chart/audit-chart.component';
import { AddAssessmentComponent } from './Components/add-assessment/add-assessment.component';
import { AssessmentChartComponent } from './Components/assessment-chart/assessment-chart.component';
import { AddInspectionComponent } from './Components/add-inspection/add-inspection.component';
import { InspectionListComponent } from './Components/inspection-list/inspection-list.component';
import { InspectionDetailDialogComponent } from './Components/inspection-detail-dialog/inspection-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NewEmployeeComponent,
    HeaderComponent,
    AdminDashComponent,
    ShiftDashComponent,
    OperatorDashComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    NewAuditComponent,
    AuditChartComponent,
    AddAssessmentComponent,
    AssessmentChartComponent,
    AddInspectionComponent,
    InspectionListComponent,
    InspectionDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,

    // Charts
    NgChartsModule
  ],
  providers: [RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
