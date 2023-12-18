import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordAjaxService } from 'src/app/service/resetPassword.ajax.service';

@Component({
  selector: 'app-admin-user-new-password-routed',
  templateUrl: './admin-user-new-password-routed.component.html',
  styleUrls: ['./admin-user-new-password-routed.component.css']
})
export class AdminUserNewPasswordRoutedComponent implements OnInit {

  newForm: FormGroup;
  status: HttpErrorResponse | null = null;
  token: string = "";

  constructor(
    private fb: FormBuilder,
    private oResetPasswordService: ResetPasswordAjaxService,
    private oMatSnackBar: MatSnackBar,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.token = (this.oActivatedRoute.snapshot.paramMap.get("token") || "1");

    this.newForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  onReset() {
    this.newForm.reset();
  }

  onSubmit() {
    if (this.newForm.valid) {
      this.updatePassword();
    }
  }

  updatePassword() { 
    this.oResetPasswordService.updatePassword(this.token, this.newForm.value.password, this.newForm.value.confirmPassword).subscribe({
      next: (data: string) => {
        this.oMatSnackBar.open("Password updated", "", {duration: 2000});
      },
      error: (error: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error updating password", "", {duration: 2000});
      }
    });
  }


}
