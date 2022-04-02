import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-brand-header',
  templateUrl: './brand-header.component.html',
  styleUrls: ['./brand-header.component.scss'],
})
export class BrandHeaderComponent implements OnInit {
  @Output() onAddBrand = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
