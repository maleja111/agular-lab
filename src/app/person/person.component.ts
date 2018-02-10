import { Component, OnInit, HostListener } from '@angular/core';
import { PersonService } from '../shared/services/person.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  title = 'Random User';

  // public person: Observable<any[]>;
  public person: any;
  constructor(private personService: PersonService) {
  }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])

  keypress(e: KeyboardEvent) {
    console.log('This is the Key: ' + e.key);
    console.log('This is the KeyCode: ' + e.keyCode);
    if (e.keyCode === 32) {
      this.getPersonData();
    }
  }

  getPersonData() {
    // console.log('This is the service: ', );
    this.personService.getPersons().subscribe(people => {
      this.person = people[Math.floor(Math.random() * people.length)];
      console.log('This is the service: ', people);
      // return people;
    });
  }
}
