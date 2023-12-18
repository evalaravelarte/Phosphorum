import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordAjaxService } from 'src/app/service/resetPassword.ajax.service';

@Component({
  selector: 'app-admin-user-reset-password-routed',
  templateUrl: './admin-user-reset-password-routed.component.html',
  styleUrls: ['./admin-user-reset-password-routed.component.css']
})
export class AdminUserResetPasswordRoutedComponent implements OnInit {

  resetForm: FormGroup;
  status: HttpErrorResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private oResetPasswordService: ResetPasswordAjaxService,
    private oMatSnackBar: MatSnackBar,
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.sendEmail();
    }
  }

  onReset() {
    this.resetForm.reset();
  }

  sendEmail() {
  
      this.oResetPasswordService.sendEmail(this.resetForm.value.email).subscribe({
        next: (data: string) => {
          this.oMatSnackBar.open('Verify email by the link sent on your email address', '', { duration: 2000 });
          
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
          this.status = error;
          this.oMatSnackBar.open("Error", '', { duration: 2000 });
        }
      });
    
  }


}
