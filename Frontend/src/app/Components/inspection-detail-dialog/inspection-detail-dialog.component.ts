import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InspectionSheet } from 'src/app/Models/InspectionSheet';

@Component({
  selector: 'app-inspection-detail-dialog',
  templateUrl: './inspection-detail-dialog.component.html',
  styleUrls: ['./inspection-detail-dialog.component.css']
})
export class InspectionDetailDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public inspection: InspectionSheet) { }

}
