import { trigger, transition, style, query, animateChild, group, animate, sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { fader, slider } from './animations';
import { DataProvider } from './providers/data.provider';
import { DatabaseService } from './services/database.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slider ]
})
export class AppComponent{
  title = 'VirajQrMenu';
  constructor(){}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}

