export interface CategoryData {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
}

export interface ImageOnly {
    id: number | string;
    src: string;
}

export interface Attribute {
    name: string;
    options: string[];
}

export interface VariationAttribute {
    name: string;
    option: string;
}

export interface Variation {
    id: number | string;
    regular_price: string | number;
    sale_price: string | number;
    attributes: VariationAttribute[];
}

export interface Product {
    type: string;
    id: number | string;
    description: string;
    short_description: string;
    name: string;
    slug: string;
    permalink: string;
    regular_price: string | number;
    sale_price: string | number;
    images: ImageOnly[] ;
    attributes: Attribute[];
    variations?: Variation[];
}

export interface VariationProduct {
    id: number;
    name: string;
    slug: string;
    type: string;
    status: string;
    description: string;
    short_description: string;
    price: string;
    regular_price: string;
    categories: CategoryData[];
    images: ImageOnly[];
    attributes: Attribute[];
    variations: any[];
    related_ids: number[];
}