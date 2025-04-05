import { Brand } from "./brand";

export interface Product{
    id?:number;
    name:string;
    price:number;
    processor:string;
    ramGB:number;
    storageGB:number;
    brand: Brand;
}