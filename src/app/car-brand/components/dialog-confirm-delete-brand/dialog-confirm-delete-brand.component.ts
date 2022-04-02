import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-delete-brand',
  templateUrl: './dialog-confirm-delete-brand.component.html',
  styleUrls: ['./dialog-confirm-delete-brand.component.scss'],
})
export class DialogConfirmDeleteBrandComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDeleteBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}
}
