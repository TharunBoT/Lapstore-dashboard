import { Brand } from "./brand";

export interface Product{
    id: number;
    name: string;
    description: string;
    processor: string;
    ram: string;
    rom: string;
    brandId: number;
    brandName?: string;
}