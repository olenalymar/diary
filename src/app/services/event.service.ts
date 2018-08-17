import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Event } from '../models/Event';
import { Marker } from '../models/Marker';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Event[];

  private eventSource = new BehaviorSubject<Event>({
    id: null,
    name: null,
    date: null,
    photosLink: null,
    description: null,
    attitude: null,
    marker: null
  });

  selectedEvent = this.eventSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.events = [
    //   {
    //     id: '1',
    //     name: 'New Year Party',
    //     date: '1/1/2018',
    //     photosLink: 'newyearsphoto.com',
    //     description:
    //       "The celebration went on into the night, everyone dancing like they'd forgotten how to stand still. Eric was moving like his limbs were made of spaghetti and Carla's face was an epic picture of pure excitement. We'd won and things were only going to get better from here on in.",
    //     attitude: 'positive'
    //   },
    //   {
    //     id: '2',
    //     name: 'Birthday',
    //     date: '1/19/2018',
    //     photosLink: 'birthdayphoto.com',
    //     description:
    //       "Eric was moving like his limbs were made of spaghetti and Carla's face was an epic picture of pure excitement. We'd won and things were only going to get better from here on in.",
    //     attitude: 'positive'
    //   }
    // ];
    this.events = [];
  }

  getEvents(): Observable<Event[]> {
    if (localStorage.getItem('events') === null) {
      this.events = [];
    } else {
      this.events = JSON.parse(localStorage.getItem('events'));
    }

    // return of(
    //   this.events.sort((a, b) => {
    //     return b.date - a.date;
    //   })
    // );

    return of(this.events);
  }

  setFormEvent(event: Event) {
    this.eventSource.next(event);
  }

  addEvent(event: Event) {
    this.events.unshift(event);

    // Add to local storage
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  updateEvent(event: Event) {
    this.events.forEach((cur, index) => {
      if (event.id === cur.id) {
        this.events.splice(index, 1);
      }
    });
    this.events.unshift(event);

    // Update to local storage
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  deleteEvent(event: Event) {
    this.events.forEach((cur, index) => {
      if (event.id === cur.id) {
        this.events.splice(index, 1);
      }
    });

    // Delete from local storage
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
