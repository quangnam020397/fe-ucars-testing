import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../services/http/http-request.service';
import { BrandTableComponent } from './components/brand-table/brand-table.component';
import { IBrand } from './models/Brand';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.scss'],
})
export class CarBrandComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(BrandTableComponent) brandTable!: BrandTableComponent;

  subscriptions: Subscription = new Subscription();
  dataSource: IBrand[] = [];

  constructor(private httpClient: HttpRequestService) {}

  ngOnInit(): void {
    this.fetchBranchData();
  }

  private fetchBranchData = () => {
    this.subscriptions.add(
      this.httpClient
        .getAllBrand<IBrand[]>()
        .subscribe(({ data, code, message }) => {
          this.dataSource = data;
          this.brandTable.setDataSource(this.dataSource);
        })
    );
  };

  handleChangePaginator = (event: PageEvent) => {
// console.log({event});
  };

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
