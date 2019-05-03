import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduit, Produit } from 'app/shared/model/produit.model';
import { ProduitService } from './produit.service';

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html'
})
export class ProduitUpdateComponent implements OnInit {
  produit: IProduit;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    prix: [],
    designation: []
  });

  constructor(protected produitService: ProduitService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.updateForm(produit);
      this.produit = produit;
    });
  }

  updateForm(produit: IProduit) {
    this.editForm.patchValue({
      id: produit.id,
      prix: produit.prix,
      designation: produit.designation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const produit = this.createFromForm();
    if (produit.id !== undefined) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  private createFromForm(): IProduit {
    const entity = {
      ...new Produit(),
      id: this.editForm.get(['id']).value,
      prix: this.editForm.get(['prix']).value,
      designation: this.editForm.get(['designation']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>) {
    result.subscribe((res: HttpResponse<IProduit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
