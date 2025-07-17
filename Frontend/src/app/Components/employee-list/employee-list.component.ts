import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  users: User[] = [];
  filteredUsers: User[] = [];
  token: string = '';
  searchEmail: string = '';
  role: string = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.role = localStorage.getItem('role') || '';
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers(this.token).subscribe({
      next: (res) => {
        this.users = res;
        this.filteredUsers = res; // 🔁 show all initially
      },
      error: () => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    });
  }

  onSearch(): void {
    if (this.searchEmail.trim() === '') {
      this.filteredUsers = [...this.users]; // 🔄 Reset list on empty search
    } else {
      this.filteredUsers = this.users.filter(emp =>
        emp.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    }
  }

  deleteUser(email: string): void {
    if (confirm(`Are you sure you want to delete user ${email}?`)) {
      this.userService.deleteUser(email, this.token).subscribe({
        next: (res) => {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });
          this.loadUsers(); // 🔄 Refresh after delete
        },
        error: () => this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 })
      });
    }
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      width: '450px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Reload list if updated
      }
    });
  }

}


