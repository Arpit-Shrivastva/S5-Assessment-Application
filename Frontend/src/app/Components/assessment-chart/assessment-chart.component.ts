import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { FiveSAssessment } from 'src/app/Models/FiveSAssessment';
import { FiveSAssessmentService } from 'src/app/Services/five-sassessment.service';

@Component({
  selector: 'app-assessment-chart',
  templateUrl: './assessment-chart.component.html',
  styleUrls: ['./assessment-chart.component.css']
})
export class AssessmentChartComponent implements OnInit {

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Compliance %', backgroundColor: '#2d3748' }]
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: { min: 0, max: 100, ticks: { stepSize: 10 } }
    }
  };

  doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: { legend: { display: false } }
  };

  doughnutCharts: { stage: string, data: ChartConfiguration<'doughnut'>['data'] }[] = [];
  assessments: FiveSAssessment[] = [];

  // scopeOptions: string[] = [];
  comment = '';

  constructor(private assessmentService: FiveSAssessmentService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')!;
    this.assessmentService.getAllAssessments(token).subscribe(res => {
      this.assessments = res;
      this.comment = res[0]?.comment || 'No comment found';
      this.auditor = res[0].auditor || 'Unknown';
      this.prepareDashboard();
    });
  }

  prepareDashboard(): void {
    const stages = ['Sort', 'Set in Order', 'Shine', 'Standardize', 'Sustain'];
    const barValues = [];
    this.doughnutCharts = [];

    for (const stage of stages) {
      const matching = this.assessments.map(a => {
        const stageObj = a?.stages?.find(s => s?.stageName === stage);
        return stageObj?.complianceRate ?? 0;
      });

      const total = matching.reduce((a, b) => a + b, 0);
      const average = matching.length ? Math.round(total / matching.length) : 0;
      barValues.push(average);

      const compliant = Math.round(average * 0.3);
      const partial = Math.round(average * 0.4);
      const non = 100 - (compliant + partial);

      this.doughnutCharts.push({
        stage,
        data: {
          labels: ['Compliant', 'Partially', 'Non'],
          datasets: [{
            data: [compliant, partial, non],
            backgroundColor: ['#22c55e', '#facc15', '#ef4444']
          }]
        }
      });
    }

    this.barChartData.labels = stages.map((s, i) => `${i + 1}. ${s}`);
    // this.barChartData.datasets[0].data = barValues;
    this.barChartData = {
      labels: stages.map((s, i) => `${i + 1}. ${s}`),
      datasets: [{
        data: [...barValues],
        label: 'Compliance %',
        backgroundColor: '#2d3748'
      }]
    }
  }


  auditor: string = '';

  loadAllData(token: string) {
    this.assessmentService.getAllAssessments(token).subscribe(res => {
      this.assessments = res;
      this.prepareDashboard();
    });
  }

  onAuditorSearch() {
    const token = localStorage.getItem('token')!;
    if (this.auditor.trim() === '') {
      this.loadAllData(token);
    } else {
      this.assessmentService.getByAuditor(this.auditor.trim(), token).subscribe(res => {
        this.assessments = res;
        this.prepareDashboard();
      });
    }
  }

  scope: string = '';
  scopeOptions: string[] = ['Sort', 'Set in Order', 'Shine', 'Standardize', 'Sustain'];


  onScopeSearch() {
    const token = localStorage.getItem('token')!;
    if (this.scope.trim() === '') {
      this.loadAllData(token);
    } else {
      this.assessmentService.getByScope(this.scope.trim(), token).subscribe(res => {
        this.assessments = res;
        this.prepareDashboard();
      });
    }
  }

}
