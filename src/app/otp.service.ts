// src/app/otp.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  // Replace with your actual server URL for OTP generation
  generateOTP(email: string): Observable<any> {
    const data = { email };
    return this.http.post('/api/generate-otp', data);
  }

  // Replace with your actual server URL for OTP verification
  verifyOTP(email: string, otp: string): Observable<any> {
    const data = { email, otp };
    return this.http.post('/api/verify-otp', data);
  }
}
