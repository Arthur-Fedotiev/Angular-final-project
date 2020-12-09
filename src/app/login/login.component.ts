import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailValidator } from 'src/app/shared/validators/emailValidator';
import { PasswordValidator } from 'src/app/shared/validators/passwordValidator';
import { UsernameValidator } from 'src/app/shared/validators/usernameValidator';
import { AuthService } from '../shared/services/auth.service';
import { IUser, IFormControls } from '../shared/interfaces/authInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogging: boolean = true;
  formTitle: string = 'Login';
  toggleBtnTitle: string = 'SignUp';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.getLoginFormGroup();
  }

  get form(): IFormControls {
    return this.loginForm.controls;
  }

  set titles(isLogging: boolean) {
    this.formTitle = isLogging ? 'Login' : 'Signup';
    this.toggleBtnTitle = isLogging ? 'Signup' : 'Cancel';
  }

  getEmailFormControl(): FormControl {
    return this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(EmailValidator.pattern),
        PasswordValidator.cannotContainSpaces,
      ])
    );
  }

  getPasswordFormControl(): FormControl {
    return this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(PasswordValidator.pattern),
        PasswordValidator.cannotContainSpaces,
      ])
    );
  }

  getusernameFormControl(): FormControl {
    return this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        UsernameValidator.validateCasePatterns,
      ])
    );
  }

  getLoginFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        email: this.getEmailFormControl(),
        password: this.getPasswordFormControl(),
      },
      { validators: PasswordValidator.cannotContainEmailParts }
    );
  }

  getRegisterFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        username: this.getusernameFormControl(),
        email: this.getEmailFormControl(),
        password: this.getPasswordFormControl(),
      },
      { validators: PasswordValidator.cannotContainEmailParts }
    );
  }

  toggleForm(): void {
    this.loginForm = this.getRegisterFormGroup();
    this.titles = !this.isLogging;
    this.isLogging = !this.isLogging;
  }

  renderError(inputType: string, errorType: string): boolean {
    return (
      this.form[inputType].touched &&
      this.form[inputType].errors &&
      this.form[inputType].errors[errorType]
    );
  }

  isError(): boolean {
    return (
      (this.loginForm.touched || this.loginForm.dirty) &&
      !!this.loginForm.errors
    );
  }

  onSubmit(formDate: IUser): void {
    this.isLogging ? this.auth.login(formDate) : this.auth.signup(formDate);
  }
}
