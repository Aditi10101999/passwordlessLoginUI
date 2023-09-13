// verify-otp.component.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
})
export class VerifyOtpComponent {
  otpForm: FormGroup;
  submitted = false; // Track form submission
  mobileNumber = "";
  otpValid = false;
  errorMessage: string = "";


  constructor(private formBuilder: FormBuilder, private router: Router,  private http: HttpClient,  private route: ActivatedRoute) {
    this.otpForm = this.formBuilder.group({
      otp: [''], // OTP field without pattern validation
    });
  }  


ngOnInit() {
  // Retrieve the mobile number from the route parameter
  this.route.params.subscribe((params) => {
    this.mobileNumber = params['mobile_number'];
    console.log('Mobile Number from route parameter:', this.mobileNumber);
  });

  // Other initialization code...
}
  verifyOTP() {
    this.submitted = true; // Set submitted flag to true
  
    // Get the OTP from the form
    const otp = this.otpForm.value.otp;
  
    // Check if the OTP is valid only if the form is submitted
    if (this.submitted && /^[0-9]{6}$/.test(otp)) {
      // Implement OTP verification logic here
  
      this.otpValid = true;

      const requestBody = {
        mobile_number: this.mobileNumber,
        otp: otp,
      };
  
      // Make an HTTP POST request to your OTP verification API
      this.http.post<any>('http://127.0.0.1:5000/verify_otp',requestBody,{ headers: headers }).subscribe(
        (response) => {
          console.log("Response",response);
          // Assuming your API returns a 200 response upon successful OTP verification
          if (response) {
            console.log('OTP verification successful:', requestBody);
  
            // Navigate to the success page
            this.router.navigate(['/login']);
          } else {
            console.error('OTP verification failed:', otp);
            // Handle OTP verification failure, e.g., show an error message
            this.submitted = false;
            this.errorMessage = 'OTP verification failed. Please try again.'; // Set the error message
            console.log(this.errorMessage);
          }
        },
        (error) => {
          console.error('Error while verifying OTP:', error);
          // Handle API request error, e.g., show an error message
        }
      );
    }
  }
  
}
