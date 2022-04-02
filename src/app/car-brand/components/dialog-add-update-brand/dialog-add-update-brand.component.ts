import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from '../../../services/http/http-request.service';
import { IBrand, IBrandCreate } from '../../models/Brand';
@Component({
  selector: 'app-dialog-add-update-brand',
  templateUrl: './dialog-add-update-brand.component.html',
  styleUrls: ['./dialog-add-update-brand.component.scss'],
})
export class DialogAddUpdateBrandComponent implements OnInit {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  fileLogo: File | null = null;
  previewLogoFile: string | ArrayBuffer | null = null;
  brandData: IBrand | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUpdateBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _formBuilder: FormBuilder,
    private httpServ: HttpRequestService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.fetchBrandById(this.data);
    }
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  handleNextStep = (step: number | null) => {
    console.log({ step });
    if (step === 1) {
      if (!this.brandData?.id) {
        this.handleCreateBrand();
      } else {
        this.handleUpdateBrand();
      }
    } else if (step === 2) {
      this.handleUploadImage();
    }
  };

  handleCreateBrand = () => {
    const data: IBrandCreate = {
      name: this.firstFormGroup.value.name,
      description: this.firstFormGroup.value.description,
      logo: '',
    };
    this.httpServ.createBrand<IBrand>(data).subscribe(({ data, message }) => {
      this.brandData = data;
    });
  };

  handleUpdateBrand = () => {
    const data: IBrandCreate = {
      name: this.firstFormGroup.value.name,
      description: this.firstFormGroup.value.description,
      logo: this.brandData?.logo || '',
    };
    if (this.brandData?.id) {
      this.httpServ.updateBrand(this.brandData?.id, data).subscribe((res) => {
        console.log(res);
      });
    }
  };

  handleImageChange = (fileInputEvent: any) => {
    this.fileLogo = fileInputEvent.target.files[0];
    if (this.fileLogo) {
      this.parseImage(this.fileLogo).then((res) => {
        this.previewLogoFile = res;
      });
    }
  };

  handleUploadImage = () => {
    console.log('upload image');

    if (this.fileLogo && this.brandData?.id) {
      const formData = new FormData();
      formData.append('file', this.fileLogo);

      this.httpServ
        .uploadImage(this.brandData?.id, formData)
        .subscribe((res) => console.log(res));
    }
  };

  // parseImage to base64
  parseImage = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // fetch detail brand by id
  fetchBrandById = (id: string) => {
    this.httpServ.getBrandById<IBrand>(id).subscribe(({ data }) => {
      this.brandData = data;
      this.parseDataToForm();
    });
  };

  // parse data to form
  parseDataToForm = () => {
    if (this.brandData) {
      this.firstFormGroup.setValue({
        name: this.brandData.name,
        description: this.brandData.description,
      });
      this.previewLogoFile = this.brandData.logo || null;
    }
  };
}
