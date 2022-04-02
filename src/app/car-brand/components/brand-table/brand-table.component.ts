import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IBrand } from '../../models/Brand';

@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.scss'],
})
export class BrandTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'logo',
    'name',
    'description',
    'created_at',
    'action'
  ];
  dataSource = new MatTableDataSource<IBrand>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @Output() onchangePage = new EventEmitter<PageEvent>();
  @Output() onDeleteBranch = new EventEmitter<IBrand>();
  @Output() onUpdateBranch = new EventEmitter<string>();


  ngOnInit(): void {
    console.log(this.dataSource);
  }
  ngAfterViewInit() {
    if (this.paginator) {
      // this.dataSource.paginator = this.paginator;
    }
  }

  public setDataSource = (_data: IBrand[]) => {
    this.dataSource.data = _data;
  };
}
