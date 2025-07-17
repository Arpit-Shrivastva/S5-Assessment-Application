import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { NewEmployeeComponent } from './Components/new-employee/new-employee.component';
import { AdminDashComponent } from './Components/admin-dash/admin-dash.component';
import { RoleService } from './Guards/role.service';
import { ShiftDashComponent } from './Components/shift-dash/shift-dash.component';
import { OperatorDashComponent } from './Components/operator-dash/operator-dash.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { NewAuditComponent } from './Components/new-audit/new-audit.component';
import { AuditChartComponent } from './Components/audit-chart/audit-chart.component';
import { AddAssessmentComponent } from './Components/add-assessment/add-assessment.component';
import { AssessmentChartComponent } from './Components/assessment-chart/assessment-chart.component';
import { AddInspectionComponent } from './Components/add-inspection/add-inspection.component';
import { InspectionListComponent } from './Components/inspection-list/inspection-list.component';

const routes: Routes = [
  // 🔐 Auth
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // 👤 Admin & Role-Based Dashboards
  {
    path: 'admin-dashboard',
    component: AdminDashComponent,
    canActivate: [RoleService],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'shift-dashboard',
    component: ShiftDashComponent,
    canActivate: [RoleService],
    data: { expectedRole: 'ROLE_SHIFT_IN_CHARGE' }
  },
  {
    path: 'operator-dashboard',
    component: OperatorDashComponent,
    canActivate: [RoleService],
    data: { expectedRole: 'ROLE_OPERATOR' }
  },

  // 👥 Employee Management
  {
    path: 'create-employee',
    component: NewEmployeeComponent,
    canActivate: [RoleService],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'all-employees',
    component: EmployeeListComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE'] }
  },

  // 📋 Audit Module
  {
    path: 'create-audit',
    component: NewAuditComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE'] }
  },
  {
    path: 'audit-dashboard',
    component: AuditChartComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE', 'ROLE_OPERATOR'] }
  },

  // 📊 Assessment Module
  {
    path: 'add-assessment',
    component: AddAssessmentComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE'] }
  },
  {
    path: 'assessment-dashboard',
    component: AssessmentChartComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE', 'ROLE_OPERATOR'] }
  },

  // 🧾 Inspection Module
  {
    path: 'audit-inspection',
    component: AddInspectionComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE', 'ROLE_OPERATOR'] }
  },
  {
    path: 'inspection-list',
    component: InspectionListComponent,
    canActivate: [RoleService],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_SHIFT_IN_CHARGE', 'ROLE_OPERATOR'] }
  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
