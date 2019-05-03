import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AppSharedModule } from 'app/shared';
import {
  ProduitComponent,
  ProduitDetailComponent,
  ProduitUpdateComponent,
  ProduitDeletePopupComponent,
  ProduitDeleteDialogComponent,
  produitRoute,
  produitPopupRoute
} from './';

const ENTITY_STATES = [...produitRoute, ...produitPopupRoute];

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProduitComponent,
    ProduitDetailComponent,
    ProduitUpdateComponent,
    ProduitDeleteDialogComponent,
    ProduitDeletePopupComponent
  ],
  entryComponents: [ProduitComponent, ProduitUpdateComponent, ProduitDeleteDialogComponent, ProduitDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppProduitModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}