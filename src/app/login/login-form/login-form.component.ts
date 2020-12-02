import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailValidator } from '../../shared/validators/emailValidator';
import { PasswordValidator } from '../../shared/validators/passwordValidator';
import { UserInfo } from '../../shared/interfaces/authInterface';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  @Output() toggleForm = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: this.formBuilder.control(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(EmailValidator.pattern),
          ])
        ),
        password: this.formBuilder.control(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(PasswordValidator.pattern),
            PasswordValidator.cannotContainSpaces,
          ])
        ),
      },
      { validators: PasswordValidator.cannotContainEmailParts }
    );
  }

  get form() {
    return this.loginForm.controls;
  }

  onClick(): void {
    this.toggleForm.emit(false);
  }

  onSubmit(userInfo: UserInfo) {
    this.authService.login(userInfo);
  }
}
