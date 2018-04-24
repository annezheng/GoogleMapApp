import { Injectable } from '@angular/core';
import { Marker } from './classes/marker';

@Injectable()
export class MarkerService {
  markers: Marker[] = [];
  labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex: number = 0;

  constructor() {
    this.load();
  }

  private load() {
    let savedMarkers = localStorage.getItem('markers');
    if (!savedMarkers) {
      console.log('No saved markers...');
      return
    }
    console.log('Loading saved markers...');
    // console.log(savedBooks);
    savedMarkers = JSON.parse(savedMarkers);
    // console.log(savedBooks);
    for (let i = 0; i < savedMarkers.length; i++) {
      let savedMarker = savedMarkers[i];
      // console.log(savedBook);
      //noinspection TypeScriptValidateTypes,TypeScriptUnresolvedFunction
      this.markers.push(Object.assign(new Marker(null, null, null, null, null, null, null), savedMarker));
    }
    console.log(this.markers);
    let label = this.markers[this.markers.length-1].label;
    this.labelIndex = this.labels.indexOf(label) + 1;
  }

  private save() {
    localStorage.setItem('markers', JSON.stringify(this.markers));
  }

  hasMarker(marker: Marker): boolean {
    return this.indexOf(marker) !== -1;
  }

  indexOf(marker: Marker): number {
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].lat === marker.lat && this.markers[i].lng === marker.lng) {
        return i
      }
    }
    return -1;
  }

  addMarker(marker: Marker) {
    if (!this.hasMarker(marker)) {
      this.markers.push(marker);
      this.save();
    }
  }

  removeMarker(marker: Marker) {
    let index = this.indexOf(marker);
    this.markers.splice(index, 1);
    this.save();
  }

  updateMarker(oldMarker, newMarker){
    let index = this.indexOf(oldMarker);
    this.markers.splice(index, 1, newMarker);
    this.save();
  }

  clearMarkers(){
    this.markers = [];
    localStorage.clear();
    this.labelIndex = 0;
  }

  getNextLabel(){
    return this.labels[this.labelIndex++ % this.labels.length];
  }


}
