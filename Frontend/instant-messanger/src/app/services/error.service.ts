import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {
  constructor() { }

  showError(text = 'Something went wrong!') {
    Swal.fire(text, '', 'error')
  }
}