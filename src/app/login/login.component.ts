import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/validators/passwordValidator';
import { PatternValidator } from 'src/app/shared/validators/patternValidator';
import { AuthService } from '../shared/services/auth.service';
import { IUser, IFormControls } from '../shared/interfaces/authInterface';
import { Form } from '../shared/enums';
import VALIDATE_CONST from '../shared/constants/validateConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  val: string;
  isLogging: boolean = true;
  formTitle: string = Form.Login;
  toggleBtnTitle: string = Form.Signup;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.getLoginFormGroup();
  }

  private getEmailFormControl(): FormControl {
    return this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATE_CONST.EMAIL_PATTERN),
        PatternValidator.cannotContainSpaces,
      ])
    );
  }

  private getPasswordFormControl(): FormControl {
    return this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATE_CONST.PASSWORD_PATTERN),
        PatternValidator.cannotContainSpaces,
      ])
    );
  }

  private getusernameFormControl(): FormControl {
    return this.formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PatternValidator.validateCasePatterns(
          VALIDATE_CONST.SPACE_CASE_PATTERN,
          VALIDATE_CONST.KEBAB_CASE_PATTERN,
          VALIDATE_CONST.CAMEL_CASE_PATTERN
        ),
      ])
    );
  }

  private getLoginFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        email: this.getEmailFormControl(),
        password: this.getPasswordFormControl(),
      },
      { validators: PasswordValidator.cannotContainEmailParts }
    );
  }

  private getRegisterFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        username: this.getusernameFormControl(),
        email: this.getEmailFormControl(),
        password: this.getPasswordFormControl(),
      },
      { validators: PasswordValidator.cannotContainEmailParts }
    );
  }

  get form(): IFormControls {
    return this.loginForm.controls;
  }

  set titles(isLogging: boolean) {
    this.formTitle = isLogging ? Form.Login : Form.Signup;
    this.toggleBtnTitle = isLogging ? Form.Signup : Form.Cancel;
  }

  toggleForm(): void {
    this.loginForm = this.isLogging
      ? this.getRegisterFormGroup()
      : this.getLoginFormGroup();
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

  onSubmit<T extends IUser>(formDate: T): void {
    this.isLogging ? this.auth.login(formDate) : this.auth.signup(formDate);
  }
}
