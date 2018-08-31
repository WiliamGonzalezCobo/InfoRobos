import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  severElements = [];
  newServerName = "";
  newServerContent = "";

  onAddServer(){
   this.severElements.push({
     type:'server',
     name:this.newServerName,
     content:this.newServerContent
   });
  }

  onAddblueprint(){
    this.severElements.push({
      type:'blueprint',
      name:this.newServerName,
      content:this.newServerContent
    });
  }


}

