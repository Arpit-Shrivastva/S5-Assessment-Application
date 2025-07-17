import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent {

  employeeForm: FormGroup;
  roles: string[] = ['OPERATOR', 'SHIFT_IN_CHARGE'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onCreate(): void {
    if (this.employeeForm.invalid) return;

    const user: User = this.employeeForm.value;

    this.userService.register(user).subscribe({
      next: () => {
        this.snackBar.open('Employee created successfully!', 'Close', { duration: 3000 });
        this.employeeForm.reset();
      },
      error: () => {
        this.snackBar.open('Failed to create employee.', 'Close', { duration: 3000 });
      }
    });
  }

}
