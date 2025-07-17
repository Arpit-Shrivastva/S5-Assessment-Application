import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(
    private forgotForm: FormBuilder,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) { }

  // Reactive Form
  forgotPassword = this.forgotForm.group({
    userEmail: ["", [Validators.required, Validators.email]], // ✅ added Validators.email
    userPassword: ["", [
      Validators.required
    ]]
  });

  // Getters for easy access
  get email() { return this.forgotPassword.get("userEmail"); }
  get password() { return this.forgotPassword.get("userPassword"); }

  // Output EventEmitter to parent
  @Output()
  forgotPasswordSubmit: EventEmitter<any> = new EventEmitter<any>();

  loading = false;
  // Submit handler
  onSubmit() {
    if (this.forgotPassword.valid) {
      this.forgotPasswordSubmit.emit({
        userEmail: this.forgotPassword.value.userEmail,
        userPassword: this.forgotPassword.value.userPassword
      });
      this.dialogRef.close();
    }
  }

  // Cancel handler
  onCancel() {
    this.dialogRef.close();
  }

}
