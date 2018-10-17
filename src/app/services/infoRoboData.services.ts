import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Robo } from "src/app/models/robo.model";
import { Tipo } from "src/app/models/tipo.model";


@Injectable({
    providedIn: 'root'
})
export class InfoRoboDataService {
    roboList: AngularFireList<any>;
    tipoList: AngularFireList<any>;
    selectedRobo: Robo = new Robo();

    constructor(private http: HttpClient, private firebase: AngularFireDatabase) {
       //this.cargarRobos();
       //this.getTipos();
       //this.insertTipo();
    }

    public getTipos() {
        this.tipoList = this.firebase.list('Tipo');
        return this.tipoList;
    }

    insertTipo() {
        this.tipoList.push({
            descripcion : 'Fleteo'
        });
    }

    public getRobos() {
        this.roboList = this.firebase.list('Robo');
        return this.roboList;
    }

    insertRobo(robo: Robo) {
        this.roboList.push({
            latitud: robo.latitud,
            longitud: robo.longitud,
            keyTipo: robo.keyTipo
        });
    }

    updateRobo(robo: Robo) {
        this.roboList.update(robo.$key,
            {
                latitud: robo.latitud,
                longitud: robo.longitud,
                keyTipo: robo.keyTipo
            });
    }

    deleteRobo($key: string) {
        this.roboList.remove($key);
    }

}