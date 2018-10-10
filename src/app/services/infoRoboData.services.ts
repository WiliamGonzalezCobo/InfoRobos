import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Robo } from "src/app/models/robo.model";


@Injectable({
    providedIn: 'root'
})
export class InfoRoboDataService {
    robohttp :Object;
    roboList: AngularFireList<any>;
    selectedRobo: Robo = new Robo();

    constructor(private http: HttpClient, private firebase: AngularFireDatabase) {
       //this.cargarRobos();
    }

    public getRobos() {
        this.roboList = this.firebase.list('Robo');
        return this.roboList;
    }

    insertEmployee(robo: Robo) {
        this.roboList.push({
            latitud: robo.latitud,
            longitud: robo.longitud
        });
    }

    updateEmployee(robo: Robo) {
        this.roboList.update(robo.$key,
            {
                latitud: robo.latitud,
                longitud: robo.longitud
            });
    }

    deleteEmployee($key: string) {
        this.roboList.remove($key);
    }

/*public cargarRobos() {
        this.http.get("https://inforobosdata.firebaseio.com/Robo.json")
            .subscribe(data => {
                this.robohttp = data;
            });
    }*/
}