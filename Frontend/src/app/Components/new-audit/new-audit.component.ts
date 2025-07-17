import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditService } from 'src/app/Services/audit.service';

@Component({
  selector: 'app-new-audit',
  templateUrl: './new-audit.component.html',
  styleUrls: ['./new-audit.component.css']
})
export class NewAuditComponent implements OnInit{

  auditForm!: FormGroup;
  today: string = '';

  constructor(
    private fb: FormBuilder,
    private auditService: AuditService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');

    this.auditForm = this.fb.group({
      location: ['', Validators.required],
      auditName: ['', Validators.required],
      score: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      // Date will be added manually in submit
    });
  }

  submitAudit(): void {
    if (this.auditForm.invalid) return;

    const audit = {
      ...this.auditForm.value,
      date: this.today
    };

    // Get JWT token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      this.snackBar.open('❌ User not authenticated.', 'Close', { duration: 3000 });
      return;
    }

    this.auditService.createAudit(audit, token).subscribe({
      next: () => {
        this.snackBar.open('✅ Audit created successfully!', 'Close', { duration: 3000 });
        this.auditForm.reset();
      },
      error: () => {
        this.snackBar.open('❌ Failed to create audit.', 'Close', { duration: 3000 });
      }
    });
  }
  
}
