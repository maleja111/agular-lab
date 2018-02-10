import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';
import { firebaseConfig } from '../environments/firebase'
import { PersonComponent } from './person/person.component';
import { PersonService } from './shared/services/person.service';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    PersonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
