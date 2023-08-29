export interface InputListProduct { }

type OutputProduct = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProduct {
  products: OutputProduct[];
}
