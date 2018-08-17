import { Marker } from './Marker';

export interface Event {
  id: string;
  name: string;
  date: any;
  photosLink?: string;
  description?: string;
  attitude?: string;
  marker?: Marker;
}
