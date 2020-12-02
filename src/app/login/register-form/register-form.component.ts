import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/shared/validators/emailValidator';
import { PasswordValidator } from 'src/app/shared/validators/passwordValidator';
import { UsernameValidator } from 'src/app/shared/validators/usernameValidator';
import { AuthService } from '../../shared/services/auth.service';
import { NewUser } from '../../shared/interfaces/authInterface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @Output() toggleForm = new EventEmitter<boolean>();
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: this.formBuilder.control(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            UsernameValidator.validateCasePatterns,
          ])
        ),
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
    return this.registerForm.controls;
  }

  onClick(): void {
    this.toggleForm.emit(true);
  }

  onSubmit(newUser: NewUser) {
    this.auth.signup(newUser);
  }
}
