import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-brand-header',
  templateUrl: './brand-header.component.html',
  styleUrls: ['./brand-header.component.scss'],
})
export class BrandHeaderComponent implements OnInit {
  @Output() onAddBrand = new EventEmitter<void>();
  @Output() onSearchBrand = new EventEmitter<string>();

  searchForm: FormControl = new FormControl({
    value: '',
    disabled: false,
  });

  currentPath: string = this.router.url;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe().subscribe((params) => {
      if (params['search'] && this.searchForm.value !== params['search']) {
        this.searchForm.setValue(params['search']);
      }
    });
  }

  onSearchValueChange = () => {
    const valueSearch = this.searchForm.value;
    this.setQueryParams(valueSearch);
  };

  setQueryParams = (valueSearch: string) => {
    this.router.navigate([this.currentPath], {
      ...(valueSearch
        ? {
            queryParams: {
              search: valueSearch,
            },
          }
        : {}),
    });
    this.onSearchBrand.emit(this.searchForm.value);
  };
}
