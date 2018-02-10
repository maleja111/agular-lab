import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PersonService {
  protected http: Http;

  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
  }


  getPersons() {
    return this.db.list('people').valueChanges();

  }

  setPersons(data) {
    // return this.db.list('people').valueChanges();
    const items = this.db.list('people');
    items.push(data);
  }
}
