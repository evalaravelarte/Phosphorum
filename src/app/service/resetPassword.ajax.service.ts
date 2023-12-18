import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';
import { API_URL } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ResetPasswordAjaxService {

  sUrl: string = API_URL + "/reset";

  constructor(
    private oHttpClient: HttpClient,
    private oCryptoService: CryptoService
  ) { }

  sendEmail(to: string): Observable<string> {
    return this.oHttpClient.post<string>(this.sUrl + "/password", { to });
  }

  updatePassword(token: string, password: string, confirmPassword: string): Observable<string> {
    const requestBody = { password: this.oCryptoService.getSHA256(password), confirmPassword: this.oCryptoService.getSHA256(confirmPassword) };
    return this.oHttpClient.put<string>(this.sUrl + "/new?token=" + token, requestBody );
  }

}
