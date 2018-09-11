import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router"
import { HomeComponent } from "src/app/components/home/home.component";
import { MapComponent } from "src/app/components/map/map.component";

const app_routes: Routes = [
    {path: '', component: HomeComponent}, 
    {path: 'mapa', component: MapComponent},
    {path: '**', pathMatch:'full', redirectTo : ''}
];

@NgModule({
    imports:[RouterModule.forRoot(app_routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}