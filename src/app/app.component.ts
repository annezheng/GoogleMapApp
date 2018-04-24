import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Marker } from './classes/marker';
import { SearchService } from './search.service';
import { MarkerService } from './marker.service';

class Signup {
  constructor(public name: string = "",
              public lat: string = "",
              public lng: string = "",
              public draggable: boolean = false,
              public label: string = "",
              ) { };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  zoom: number = 2;
  startLat: number = 50.8503;
  startLng: number = 4.3517;

  model: Signup = new Signup();
  @ViewChild('f') form: any;

  constructor(private markerService: MarkerService,
              private searchService: SearchService) {
  }

  toggleDraggable(event) {
    if ( event.target.checked ) {
      this.model.draggable = true;
    }else{
      this.model.draggable = false;
    }
  }

  onSubmitCreateMarker(){
    if (this.form.valid) {
      let marker = new Marker(
        this.model.name,
        parseFloat(this.model.lat),
        parseFloat(this.model.lng),
        this.model.draggable,
        this.markerService.getNextLabel());
      this.markerService.addMarker(marker);
      this.form.reset();
    }
  }

  onClickMapAddMarker(event: any){
    let marker = new Marker(
      '',
      event.coords.lat,
      event.coords.lng,
      false,
      this.markerService.getNextLabel());
    this.markerService.addMarker(marker);
  };

  deleteMarker(marker){
    this.markerService.removeMarker(marker);
  };

  markerDragEnd(marker, event){
    let newMarker = new Marker(
      '',
      event.coords.lat,
      event.coords.lng,
      marker.draggable,
      marker.label,
      marker.formattedAddress,
      marker.addressComponents
    );
    this.markerService.updateMarker(marker, newMarker);
  };

  clearAllMarkers(){
    this.markerService.clearMarkers();
  };

  getCoords(name){
    console.log('name', name);
    this.searchService.getLocation(name)
        .subscribe(response => {
          this.model.lat = response.results[0].geometry.location.lat;
          this.model.lng = response.results[0].geometry.location.lng;
        })
  };

  onSearch(location){
    this.searchService.getLocation(location)
        .subscribe(response => {
            let formattedAddress = response.results[0].formatted_address;
            let marker = new Marker(
              '',
              response.results[0].geometry.location.lat,
              response.results[0].geometry.location.lng,
              true,
              this.markerService.getNextLabel(),
              formattedAddress,
              response.results[0].address_components
            );
            this.markerService.addMarker(marker);            
        });
  }

  clickedMarker(m, i){
    console.log('Clicked marker index', i);
  }

  /*onSearch(location){
    let apiURL = `${this.apiRoot}?address=${location}&key=${this.key}`;
    this.http
        .get(apiURL)
        .toPromise()
        .then(
          res => {
            let formattedAddress = res.json().results[0].formatted_address;
            let addressComponents = res.json().results[0].address_components;
            let lat = res.json().results[0].geometry.location.lat;
            let lng = res.json().results[0].geometry.location.lng;
            let locationAdded = false;

            for (let i=0; i<this.locations.length; i++){
              if (this.locations[i].lat === lat && this.locations[i].lng === lng){
                locationAdded = true;
                break;
              }
            };
            if (!locationAdded){
              let loc = {
                formattedAddress: formattedAddress,
                addressComponents: addressComponents,
                lat: lat,
                lng: lng,
              };
              this.locations.unshift(loc);
            };
            this.addMarker(formattedAddress, lat, lng, true);
          });
    };*/
}
