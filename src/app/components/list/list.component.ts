import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event.service';

import { Event } from '../../models/Event';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  events: Event[];
  selectedEvent: Event;
  loaded: boolean = false;
  search: string;
  searchResults: Event[];
  attitude: string;
  date: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // this.events = this.eventService.getEvents();
    this.eventService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedEvent = {
          id: '',
          name: '',
          date: '',
          photosLink: '',
          description: '',
          attitude: ''
        };
      }
    });

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.loaded = true;
    });
  }

  onSelect(event: Event) {
    this.eventService.setFormEvent(event);
    this.selectedEvent = event;
  }

  onDelete(event: Event) {
    if (confirm('Are you sure?')) {
      this.eventService.deleteEvent(event);
    }
  }

  searchEvents() {
    this.searchResults = [];
    const text = this.search.toLowerCase();
    this.events.forEach(event => {
      if (event.name.toLowerCase().indexOf(text) != -1) {
        this.searchResults.push(event);
      }
    });
    if (!this.search) {
      this.searchResults = null;
    }
  }

  sortByDate() {
    if (this.date == 'descendingly') {
      this.events.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (this.date == 'ascending') {
      this.events.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
  }

  sortByAttitude() {
    if (this.attitude == 'bad-good') {
      this.events.sort((a, b) => {
        if (a.attitude > b.attitude) {
          return 1;
        }
      });
    } else if (this.attitude == 'good-bad') {
      this.events.sort((a, b) => {
        if (b.attitude > a.attitude) {
          return 1;
        }
      });
    }
  }
}
