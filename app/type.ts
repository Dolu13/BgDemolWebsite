export interface CategoryDetails {
    id: number;
    name: string;
    description: string;
    img_path: string;
}

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    img_path: string;
    colors: string[];
    lengths: string[];
}