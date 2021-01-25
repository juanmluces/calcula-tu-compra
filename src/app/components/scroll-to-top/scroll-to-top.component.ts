import { Component, OnInit, } from '@angular/core';

import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  faChevronUp = faChevronUp
  windowScrolled: boolean;
  constructor() { }

  ngOnInit() { }
}

