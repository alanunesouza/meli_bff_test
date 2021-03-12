export type Author = {
  name: string;
  lastname: string;
};

export type Categories = string[];

export type ProductItem = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  state: string;
};

export type ProductItemDetail = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  sold_quantity: number;
  free_shipping: boolean;
  description: string;
};

export type ProductList = {
  author: Author;
  categories: Categories;
  items: ProductItem[];
};

export type ProductDetails = {
  author: Author;
  item: ProductItemDetail;
};
