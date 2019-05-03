import { ICategory } from 'app/shared/model/category.model';

export interface IProduit {
  id?: number;
  prix?: number;
  designation?: string;
  descriptions?: ICategory[];
}

export class Produit implements IProduit {
  constructor(public id?: number, public prix?: number, public designation?: string, public descriptions?: ICategory[]) {}
}
