import { Component, ViewChild,OnInit } from '@angular/core';
import { } from '@types/googlemaps';
import { InfoRoboDataService } from 'src/app/services/infoRoboData.services';
import { NgForm } from '@angular/forms'
import { Robo } from 'src/app/models/robo.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  isTracking : boolean;
  currentLat : string;
  currentLong : string;
  marker : google.maps.Marker;
  roboList: Robo [];

  constructor(public infoRoboData : InfoRoboDataService){
  }

  ngOnInit() {  
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.findMe();
    this.listarRobos();
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude ;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  onSubmit(roboForm: NgForm) {
    if (roboForm.value.$key == null)
      this.infoRoboData.insertEmployee(roboForm.value);
    else
      this.infoRoboData.updateEmployee(roboForm.value);
    this.resetForm(roboForm);
    //this.tostr.success('Submitted Succcessfully', 'Employee Register');
  }

  resetForm (roboForm?: NgForm) {
    if  (roboForm != null)
      roboForm.reset();
    this.infoRoboData.selectedRobo = {
      $key: null,
      latitud: '',
      longitud: ''
    }
  }

  listarRobos(){
    this.roboList = [];
    var x = this.infoRoboData.getRobos();
    x.snapshotChanges().subscribe(item => {
      
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.roboList.push(y as Robo);
      });
    });
    console.log('listar robos');
    console.log(this.roboList);
  }
}
