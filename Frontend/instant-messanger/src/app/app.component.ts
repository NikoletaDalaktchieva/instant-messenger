import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static title = 'Instant messanger';
  static url = 'http://localhost:8080'


  static showError(text = 'Something went wrong!') {
    Swal.fire(text, '', 'error')
  }
}
