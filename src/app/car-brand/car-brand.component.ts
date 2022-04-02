import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { HttpRequestService } from '../services/http/http-request.service';
import { BrandTableComponent } from './components/brand-table/brand-table.component';
import { IBrand } from './models/Brand';
import { DialogConfirmDeleteBrandComponent } from './components/dialog-confirm-delete-brand/dialog-confirm-delete-brand.component';
import { DialogAddUpdateBrandComponent } from './components/dialog-add-update-brand/dialog-add-update-brand.component';
import { BrandHeaderComponent } from './components/brand-header/brand-header.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.scss'],
})
export class CarBrandComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(BrandTableComponent) brandTable!: BrandTableComponent;
  @ViewChild(BrandHeaderComponent) brandHeader!: BrandHeaderComponent;

  subscriptions: Subscription = new Subscription();
  dataSource: IBrand[] = [];
  valueSearch: string = '';

  constructor(private httpServ: HttpRequestService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchBranchData();
  }

  private fetchBranchData = (valueSearch: string = '') => {
    this.subscriptions.add(
      this.httpServ
        .getAllBrand<IBrand[]>(valueSearch ? { searchValue: valueSearch } : {})
        .subscribe(({ data, code, message }) => {
          this.dataSource = data;
          this.brandTable.setDataSource(this.dataSource);
        })
    );
  };

  handleChangePaginator = (event: PageEvent) => {
    // console.log({event});
  };

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleUpdateBrand = (id: string) => {
    this.openModalUpdateBrand(id);
  };

  handleDeleteBrand = (id: string) => {
    this.httpServ.deleteBrand(id).subscribe(({ code, message }) => {
      console.log({ code, message });
      this.fetchBranchData();
    });
  };

  openDialogDeleteBrand = (elem: IBrand) => {
    const dialogRef = this.dialog.open(DialogConfirmDeleteBrandComponent, {
      width: '250px',
      data: elem.name,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && elem.id) {
        this.handleDeleteBrand(elem.id);
      }
    });
  };

  openModalAddNewBrand = () => {
    const dialogRef = this.dialog.open(DialogAddUpdateBrandComponent, {
      width: '600px',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.fetchBranchData(this.valueSearch);
    });
  };

  openModalUpdateBrand = (id: string) => {
    const dialogRef = this.dialog.open(DialogAddUpdateBrandComponent, {
      width: '600px',
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.fetchBranchData(this.valueSearch);
    });
  };

  handleSearchBrand = (value: string) => {
    this.valueSearch = value;
    this.fetchBranchData(value);
  };
}
