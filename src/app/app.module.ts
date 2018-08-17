import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatListModule,
  MatTableModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// angular google maps
import { AgmCoreModule } from '@agm/core';

// components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';

// services
import { EventService } from './services/event.service';

// routing
import { AppRoutingModule } from './/app-routing.module';
import { EventComponent } from './components/event/event.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    ListComponent,
    AddComponent,
    EventComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatListModule,
    MatNativeDateModule,

    // google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCCcXlkhRWiNYvSNLe3u-WZp6v9pX3pH2Y',
      libraries: ['places']
    }),

    // routing
    AppRoutingModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule {}
export class PizzaPartyAppModule {}
