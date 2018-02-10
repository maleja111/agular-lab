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
  constructor(
    private personService: PersonService,
    private fb: FormBuilder
  ) {
    this.register = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit() {
    this.getPersonData();
  }

  save(): void {
    console.log('Saved: ' + JSON.stringify(this.register.value));
    this.personService.setPersons(this.register.value);
    this.getPersonData();
  }
  getPersonData() {
    // console.log('This is the service: ', );
    this.personService.getPersons().subscribe(people => {
      this.listPeople = people;
      console.log('This is the service: ', people);
      // return people;
    });
  }
}
