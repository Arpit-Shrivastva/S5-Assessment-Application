import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private matDialog : MatDialog,
    private router : Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // onLogin(): void {
  //   const user: User = this.loginForm.value;

  //   this.userService.login(user).subscribe({
  //     next: (res) => {
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('role', res.role);  // ✅ Save role
  //       localStorage.setItem('name', res.name);

  //       // Role-based redirect
  //       if (res.role === 'ROLE_ADMIN') {
  //         this.router.navigate(['/admin-dashboard']).then(() => {
  //           window.location.reload();
  //         });
  //       } else if (res.role === 'ROLE_SHIFT_IN_CHARGE') {
  //         this.router.navigate(['/shift-dashboard']).then(() => {
  //           window.location.reload();
  //         });
  //       } else if (res.role === 'ROLE_OPERATOR') {
  //         this.router.navigate(['/operator-dashboard']).then(() => {
  //           window.location.reload();
  //         });
  //       } else {
  //         // Optional fallback for unknown roles
  //         this.router.navigate(['/unauthorized']).then(() => {
  //           window.location.reload();
  //         });
  //       }
        
  //       this.snackBar.open(`Welcome ${res.name}`, 'Close', { duration: 3000 });
  //     },
  //     error: () => {
  //       this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
  //     }
  //   });
  // }
  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;

    const user: User = this.loginForm.value;

    this.userService.login(user).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('name', res.name);

        // Role-based redirect
        let redirectUrl = '/';
        if (res.role === 'ROLE_ADMIN') redirectUrl = '/admin-dashboard';
        else if (res.role === 'ROLE_SHIFT_IN_CHARGE') redirectUrl = '/shift-dashboard';
        else if (res.role === 'ROLE_OPERATOR') redirectUrl = '/operator-dashboard';
        else redirectUrl = '/unauthorized';

        this.router.navigate([redirectUrl]).then(() => window.location.reload());
        this.snackBar.open(`Welcome ${res.name}`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  forgotPassword() {
    const dialogRef = this.matDialog.open(ForgotPasswordComponent);

    dialogRef.componentInstance.forgotPasswordSubmit.subscribe((data) => {
      // `data` is: { userEmail: string, userPassword: string }
      const email = data.userEmail;
      const userPayload: User = {
        email: data.userEmail, // needed in your backend Users model
        password: data.userPassword,
        name: '',
        role: ''
      };

      this.userService.updatePassword(email, userPayload).subscribe(
        () => {
          this.snackBar.open('Password changed successfully', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'blue']
          });
          dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Failed to change password. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'warn']
          });
          dialogRef.close();
        }
      );
    });
  }
  

  
}
