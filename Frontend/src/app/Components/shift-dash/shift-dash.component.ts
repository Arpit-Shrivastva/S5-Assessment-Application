import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/Services/audit.service';
import { FiveSAssessmentService } from 'src/app/Services/five-sassessment.service';
import { InspectionService } from 'src/app/Services/inspection.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-shift-dash',
  templateUrl: './shift-dash.component.html',
  styleUrls: ['./shift-dash.component.css']
})
export class ShiftDashComponent implements OnInit {

  constructor(private router: Router,
    private user: UserService,
    private audit: AuditService,
    private inspection: InspectionService,
    private assessment: FiveSAssessmentService) { }

  token: string = '';
  totalEmp: number = 0;
  totalAudit: number = 0;
  totalInsprction: number = 0;
  totalAssessments: number = 0;

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

    this.user.getAllUsers(this.token).subscribe({
      next: (res) => {
        this.totalEmp = res.length;
      }
    });

    this.audit.getAllAudits(this.token).subscribe({
      next: (res) => {
        this.totalAudit = res.length;
      }
    });

    this.inspection.getAllInspections().subscribe({
      next: (res) => {
        this.totalInsprction = res.length;
      }
    });

    this.assessment.getAllAssessments(this.token).subscribe({
      next: (res) => {
        this.totalAssessments = res.length;
      }
    });

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
