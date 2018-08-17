import { Component, OnInit } from '@angular/core';

import { MouseEvent } from '@agm/core';

// google places
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

// service
import { EventService } from '../../services/event.service';

// interfaces
import { Event } from '../../models/Event';
import { Marker } from '../../models/Marker';

// router
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  id: string;
  name: string;
  date: string;
  photosLink: string;
  description: string;
  attitude: string = 'neutral';
  isNew: boolean = true;
  events: Event[];
  marker: Marker = { lat: null, lng: null };
  zoom: number = 4;
  lat: number = 49.988358;
  lng: number = 36.232845;
  searchControl: FormControl;
  latitude: number;
  longitude: number;

  markers: Marker[] = [];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private eventService: EventService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // subscribe to the selectedEvent observable
    this.eventService.selectedEvent.subscribe(event => {
      if (event.id !== null) {
        this.isNew = false;
        this.id = event.id;
        this.name = event.name;
        this.date = event.date;
        this.photosLink = event.photosLink;
        this.description = event.description;
        this.attitude = event.attitude;
        this.marker = event.marker;
      }
    });

    // google places

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude
          this.marker.lat = place.geometry.location.lat();
          this.marker.lng = place.geometry.location.lng();
        });
      });
    });
  }

  onSubmit() {
    // check if new event
    if (this.isNew) {
      // create a new event
      const newEvent = {
        id: this.generateId(),
        name: this.name,
        date: this.date,
        photosLink: this.photosLink,
        description: this.description,
        attitude: this.attitude,
        marker: this.marker
      };
      // add event
      if (this.name && this.date) {
        this.eventService.addEvent(newEvent);
      }
    } else {
      // create event to be updated
      const updEvent = {
        id: this.id,
        name: this.name,
        date: this.date,
        photosLink: this.photosLink,
        description: this.description,
        attitude: this.attitude,
        marker: this.marker
      };
      // update event
      this.eventService.updateEvent(updEvent);
    }
    // clear state
    this.clearState();
    // redirect to the main page
    this.router.navigateByUrl('');
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.name = '';
    this.date = '';
    this.photosLink = '';
    this.description = '';
    this.attitude = 'neutral';
    this.marker = { lat: null, lng: null };
    this.eventService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  mapClicked($event: MouseEvent) {
    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker.lat = position.coords.latitude;
        this.marker.lng = position.coords.longitude;
      });
    }
  }
}
