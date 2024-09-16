export interface CreateProductType {
  title: string;
  description: string;
  price: number;
  tags: string;
  productType: string;
  media: File[];
}
export interface Product extends CreateProductType {
  id: string;
}
