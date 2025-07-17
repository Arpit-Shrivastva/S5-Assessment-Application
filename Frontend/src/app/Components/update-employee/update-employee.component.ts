import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  updateForm: FormGroup;
  roles: string[] = ['ROLE_OPERATOR', 'ROLE_SHIFT_IN_CHARGE'];

  constructor(
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.updateForm = this.fb.group({
      name: [data.user.name, Validators.required],
      role: [data.user.role, Validators.required]
    });
  }

  onUpdate(): void {
    if (this.updateForm.invalid) return;

    const token = localStorage.getItem('token') || '';
    const updatedUser = this.updateForm.value;

    this.userService.updateUser(this.data.user.email, updatedUser, token).subscribe({
      next: (res) => {
        this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Failed to update user.', 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
  
}
