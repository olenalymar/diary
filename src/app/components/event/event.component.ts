import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EventService } from '../../services/event.service';

import { Event } from '../../models/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[];
  event: Event;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private eventService: EventService
  ) {}

  ngOnInit() {
    // get id
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(event => {
        if (event.id == id) {
          this.event = event;
        }
      });
    });
  }
}
