import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Audit } from 'src/app/Models/Audit';
import { AuditService } from 'src/app/Services/audit.service';

@Component({
  selector: 'app-audit-chart',
  templateUrl: './audit-chart.component.html',
  styleUrls: ['./audit-chart.component.css']
})
export class AuditChartComponent implements OnInit{

  audits: Audit[] = [];
  searchLocation: string = '';
  userRole: string = '';



  // 🔹 Bar Chart: Last 10 Days
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Audits per Day', backgroundColor: '#6366F1' }]
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true } }
  };


  doughnutData: number[] = [0, 0, 0, 0];
  // 🔸 Doughnut Chart Options
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  // 🔸 Doughnut Chart Data for 4 statuses
  // doughnutStatus = [
  //   { label: 'InProgress', chartData: { labels: ['InProgress'], datasets: [{ data: [0], backgroundColor: ['#3B82F6'] }] } },
  //   { label: 'Pending', chartData: { labels: ['Pending'], datasets: [{ data: [0], backgroundColor: ['#FACC15'] }] } },
  //   { label: 'Completed', chartData: { labels: ['Completed'], datasets: [{ data: [0], backgroundColor: ['#10B981'] }] } },
  //   { label: 'Rejected', chartData: { labels: ['Rejected'], datasets: [{ data: [0], backgroundColor: ['#EF4444'] }] } }
  // ];

  doughnutStatus = [
    {
      label: 'Pending',
      chartData: {
        labels: ['Pending'],
        datasets: [{
          data: [this.doughnutData[0] || 0],
          backgroundColor: [this.doughnutData[0] > 0 ? '#FACC15' : '#E5E7EB']  // yellow or gray
        }]
      }
    },
    {
      label: 'InProgress',
      chartData: {
        labels: ['InProgress'],
        datasets: [{
          data: [this.doughnutData[1] || 0],
          backgroundColor: [this.doughnutData[1] > 0 ? '#3B82F6' : '#E5E7EB']  // blue or gray
        }]
      }
    },
    {
      label: 'Completed',
      chartData: {
        labels: ['Completed'],
        datasets: [{
          data: [this.doughnutData[2] || 0],
          backgroundColor: [this.doughnutData[2] > 0 ? '#10B981' : '#E5E7EB']  // green or gray
        }]
      }
    },
    {
      label: 'Rejected',
      chartData: {
        labels: ['Rejected'],
        datasets: [{
          data: [this.doughnutData[3] || 0],
          backgroundColor: [this.doughnutData[3] > 0 ? '#EF4444' : '#E5E7EB']  // red or gray
        }]
      }
    }
  ];
  

  constructor(private auditService: AuditService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchAudits();
    this.userRole = localStorage.getItem('role') || '';
  }

  // 🔄 Fetch All Audits
  fetchAudits(): void {
    const token = localStorage.getItem('token')!;
    this.auditService.getAllAudits(token).subscribe(audits => {
      this.audits = audits;
      this.prepareChartData(audits);
    });
  }

  // 📊 Prepare Bar and Doughnut Chart Data
  prepareChartData(audits: Audit[]): void {
    const today = new Date();
    const dateCounts: { [key: string]: number } = {};

    // Initialize last 10 days with 0 count
    for (let i = 9; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().slice(0, 10); // yyyy-mm-dd
      dateCounts[key] = 0;
    }

    // Status counts
    const statusCounts = {
      InProgress: 0,
      Pending: 0,
      Completed: 0,
      Rejected: 0
    };

    // Count audits by date and status
    audits.forEach(audit => {
      const auditDate = new Date(audit.date);
      if (!isNaN(auditDate.getTime())) {
        const key = auditDate.toISOString().slice(0, 10);
        if (dateCounts.hasOwnProperty(key)) {
          dateCounts[key]++;
        }
      }

      const status = audit.status as keyof typeof statusCounts;
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }
    });

    // ✅ Bar Chart (Audits per Day)
    this.barChartData = {
      labels: Object.keys(dateCounts),
      datasets: [{
        data: Object.values(dateCounts).map(count => Number(count.toFixed(0))), // Ensures whole numbers
        label: 'Audits per Day',
        backgroundColor: '#6366F1'
      }]
    };

    // ✅ Doughnut charts: grey if value 0
    this.doughnutStatus = [
      {
        label: 'InProgress',
        chartData: {
          labels: ['InProgress'],
          datasets: [{
            data: [statusCounts.InProgress],
            backgroundColor: [statusCounts.InProgress > 0 ? '#3B82F6' : '#E5E7EB']
          }]
        }
      },
      {
        label: 'Pending',
        chartData: {
          labels: ['Pending'],
          datasets: [{
            data: [statusCounts.Pending],
            backgroundColor: [statusCounts.Pending > 0 ? '#FACC15' : '#E5E7EB']
          }]
        }
      },
      {
        label: 'Completed',
        chartData: {
          labels: ['Completed'],
          datasets: [{
            data: [statusCounts.Completed],
            backgroundColor: [statusCounts.Completed > 0 ? '#10B981' : '#E5E7EB']
          }]
        }
      },
      {
        label: 'Rejected',
        chartData: {
          labels: ['Rejected'],
          datasets: [{
            data: [statusCounts.Rejected],
            backgroundColor: [statusCounts.Rejected > 0 ? '#EF4444' : '#E5E7EB']
          }]
        }
      }
    ];
  }
  

  // 🔍 Filter by Location
  filterByLocation(): void {
    const token = localStorage.getItem('token')!;
    const location = this.searchLocation.trim();

    if (!location) {
      this.fetchAudits();
      return;
    }

    this.auditService.getAuditsByLocation(location, token).subscribe(audits => {
      this.audits = audits;
      this.prepareChartData(audits);
    });
  }


  startDate: string = '';
  endDate: string = '';

  searchByDateRange(): void {
    const token = localStorage.getItem('token')!;
    if (!this.startDate || !this.endDate) return;

    this.auditService.getAuditsByDateRange(this.startDate, this.endDate, token)
      .subscribe(audits => {
        this.audits = audits;
        console.log('Date range results:', audits);
        this.prepareChartData(audits); // If needed to update charts too
      });
  }

  clearDateFilter(): void {
    this.startDate = '';
    this.endDate = '';
    this.fetchAudits(); // 👈 Load all audits again
  }
  

  deleteAuditById(id: string): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.auditService.deleteAudit(id, token).subscribe({
      next: () => {
        this.audits = this.audits.filter(a => a.id !== id);
        this.snackBar.open('Audit deleted successfully', 'Close', { duration: 3000 });
      },
      error: err => {
        console.error('Delete failed', err);
        this.snackBar.open('Failed to delete audit', 'Close', { duration: 3000 });
      }
    });
  }
  
  

}
