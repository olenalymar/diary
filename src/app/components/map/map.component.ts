import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

import { EventService } from '../../services/event.service';

import { Event } from '../../models/Event';
import { Marker } from '../../models/Marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  zoom: number = 3;
  lat: number = 49.988358;
  lng: number = 36.232845;

  markers: Marker[] = [];

  events: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
    this.events.forEach((event, i) => {
      if (event.marker) {
        event.marker.label = event.name;
        setTimeout(() => {
          this.markers.push(event.marker);
        }, i * 500);
      }
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
}
