import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiveSAssessment } from 'src/app/Models/FiveSAssessment';
import { FiveSAssessmentService } from 'src/app/Services/five-sassessment.service';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent {

  assessmentForm: FormGroup;
  token: string = localStorage.getItem('token') || '';

  stageOptions = ['Sort', 'Set in Order', 'Shine', 'Standardize', 'Sustain'];

  constructor(private fb: FormBuilder, private assessmentService: FiveSAssessmentService) {
    this.assessmentForm = this.fb.group({
      scope: ['', Validators.required],
      auditor: ['', Validators.required],
      date: [this.getTodayDate(), Validators.required],
      comment: [''],
      stages: this.fb.array([this.createStageFormGroup()])
    });
  }

  get stages(): FormArray {
    return this.assessmentForm.get('stages') as FormArray;
  }

  createStageFormGroup(): FormGroup {
    return this.fb.group({
      stageName: ['', Validators.required],
      complianceRate: [0, Validators.required],
      compliantPercentage: [0, Validators.required],
      partiallyCompliantPercentage: [0, Validators.required],
      nonCompliantPercentage: [0, Validators.required]
    });
  }

  addStage(): void {
    this.stages.push(this.createStageFormGroup());
  }

  removeStage(index: number): void {
    this.stages.removeAt(index);
  }

  onSubmit(): void {
    if (this.assessmentForm.invalid) return;

    const assessment: FiveSAssessment = this.assessmentForm.value;

    this.assessmentService.createAssessment(assessment, this.token).subscribe({
      next: () => {
        alert('Assessment submitted successfully!');
        this.assessmentForm.reset();
        this.stages.clear();
        this.stages.push(this.createStageFormGroup());
      },
      error: (err) => {
        alert('Error submitting assessment');
        console.error(err);
      }
    });
  }

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: yyyy-MM-dd
  }
}
