
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from "@angular/animations";
import { timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/internal/operators';

import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Mensagem : OK';

  snackVisibility: string = 'hidden';

  constructor( 
    private notificationService: NotificationService 
  ) { }

  ngOnInit() {

    this.notificationService.notifier
      .pipe( 
        tap( message => { this.message = message
                          this.snackVisibility = 'visible' }
        ) 
      ).pipe( switchMap( message => timer(2000) )
      ).subscribe( () => this.snackVisibility = 'hidden' );

    // Forma simplificada ( permite que 2 Observables entrem em conflito )
    // this.notificationService.notifier
    //   .subscribe(message => {
    //       this.message = message;
    //       this.snackVisibility = 'visible';
    //       timer(2000).subscribe( () => this.snackVisibility = 'hidden' );
    // });

  };
};