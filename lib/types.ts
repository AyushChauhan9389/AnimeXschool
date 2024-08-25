interface CategoryData {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
}

type Product = {
    type: string;
    id: number | string;
    name: string;
    slug: string;
    permalink: string;
    regular_price: string | number;
    sale_price: string | number;
    images: {
        id: number | string;
        src: string;
    }[];
    attributes: {
        name: string;
        options: string[];
    }[];
    variations?: {
        id: number | string;
        regular_price: string | number;
        sale_price: string | number;
        attributes: {
            name: string;
            option: string;
        }[];
    }[];
};