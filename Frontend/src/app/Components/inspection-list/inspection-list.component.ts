import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InspectionSheet } from 'src/app/Models/InspectionSheet';
import { InspectionService } from 'src/app/Services/inspection.service';
import { InspectionDetailDialogComponent } from '../inspection-detail-dialog/inspection-detail-dialog.component';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {

  inspections: InspectionSheet[] = [];
  filteredInspections: InspectionSheet[] = [];
  searchAuditor = '';
  role = localStorage.getItem('role');
  loading = false;

  constructor(
    private inspectionService: InspectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections(): void {
    this.loading = true;
    this.inspectionService.getAllInspections().subscribe({
      next: data => {
        this.inspections = data;
        this.filteredInspections = [...data];
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  searchByAuditor(): void {
    const term = this.searchAuditor.trim().toLowerCase();
    this.filteredInspections = term
      ? this.inspections.filter(insp =>
        insp.auditedBy.toLowerCase().includes(term)
      )
      : [...this.inspections];
  }

  clearSearch(): void {
    this.searchAuditor = '';
    this.filteredInspections = [...this.inspections];
  }

  deleteInspection(id: string): void {
    if (this.role !== 'ROLE_ADMIN') return;

    const confirmed = window.confirm('Are you sure you want to delete this inspection?');
    if (!confirmed) return;

    this.inspectionService.deleteInspection(id).subscribe(() => {
      this.snackBar.open('Inspection deleted successfully', 'Close', { duration: 2000 });
      this.loadInspections();
    });
  }

  openDetailDialog(inspection: InspectionSheet): void {
    this.dialog.open(InspectionDetailDialogComponent, {
      width: '700px',
      data: inspection,
      autoFocus: false
    });

  }
}
