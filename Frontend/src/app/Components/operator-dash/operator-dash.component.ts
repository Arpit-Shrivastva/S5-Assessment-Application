import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/Services/audit.service';
import { FiveSAssessmentService } from 'src/app/Services/five-sassessment.service';
import { InspectionService } from 'src/app/Services/inspection.service';

@Component({
  selector: 'app-operator-dash',
  templateUrl: './operator-dash.component.html',
  styleUrls: ['./operator-dash.component.css']
})
export class OperatorDashComponent implements OnInit {

  constructor(private router: Router,
    private audit: AuditService,
    private inspection: InspectionService,
    private assessment: FiveSAssessmentService) { }

  token: string = '';
  totalAudit: number = 0;
  totalInsprction: number = 0;
  totalAssessments: number = 0;


  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

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
