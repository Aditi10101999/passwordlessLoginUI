// send-otp.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css'],
})
export class SendOtpComponent {
  mobileNumber: string = '';
  mobileNumberValid = false;
  submitted = false;

  constructor(
    private router: Router,
    private http: HttpClient // Inject HttpClient
  ) {}

  sendOTP() {
    this.submitted = true;

    if (this.submitted && /^[0-9]{10}$/.test(this.mobileNumber)) {
      this.mobileNumberValid = true;
      
      // Make an API call to send the OTP
      const apiURL = 'http://127.0.0.1:5000/send_otp'; // Replace with your API endpoint
      const requestBody = { mobile_number: this.mobileNumber };

      this.http.post(apiURL,requestBody,{ headers: headers }).subscribe(
        (response) => {
          // Handle the API response here (e.g., success message)
          console.log('API response:', response);
          this.router.navigate(['/verify-otp', { mobile_number: this.mobileNumber }]);
        },
        (error) => {
          // Handle API error (e.g., display an error message)
          console.error('API error:', error);
        }
      );

    } else {
      this.mobileNumberValid = false;
    }
  }
}
