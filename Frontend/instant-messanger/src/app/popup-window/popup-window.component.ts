import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.addEventListener('click', ()=> {
      this.closePopup()
    })
  }

  closePopup() {
    this.el.nativeElement.classList.remove('overlay.active')
  }

}