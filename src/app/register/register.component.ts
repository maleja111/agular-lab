import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { PersonService } from '../shared/services/person.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  listPeople;
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(
    private personService: PersonService,
    private fb: FormBuilder
  ) {
    this.register = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
    });
  }

  ngOnInit() {
    this.getPersonData();
    const emailControl = this.register.get('email');
    emailControl.valueChanges.subscribe(value =>
      this.setMessage(emailControl));
  }

  save(): void {
    console.log('Saved: ' + JSON.stringify(this.register.value));
    this.personService.setPersons(this.register.value);
    this.getPersonData();
    this.register.reset();
  }
  getPersonData() {
    // console.log('This is the service: ', );
    this.personService.getPersons().subscribe(people => {
      this.listPeople = people;
      console.log('This is the service: ', people);
      // return people;
    });
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }
}
