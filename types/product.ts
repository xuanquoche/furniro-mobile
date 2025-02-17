import { Size, Status } from "@/constants/enum";

export interface Product {
  _id: string;
  product_name: string;
  product_description: string;
  size: Size;
  original_price: number;
  discount: number;
  thumbnail: string;
  image: string[];
  status: Status;
  quantity: number;
  color: string;
  brand: string;
  categories: {
    name: string;
    _id: string;
  };
  createdBy: {
    id: string;
    email: string;
  };
}
