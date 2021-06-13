import { Injectable } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {
  constructor(private userService: UserService,
    private router: Router,) { }

  showError(text = 'Something went wrong!') {
    Swal.fire(text, '', 'error')
  }
}