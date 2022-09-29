import mongoose, { Schema } from 'mongoose';
import { boolean } from 'yup';
export interface ProductInteface {
    _id: String;
    name: String;
    descricao: String;
    quantidadeEstoque: String;
    preco: number;
    precoPromocional:number;
    precoPromoAtivado:boolean;
    tipo:string
}
const ProductSchema = new Schema(
    {
        name: String,
        descricao: String,
        quantidadeEstoque: String,
        preco: Number,
        precoPromocional:Number,
        precoPromoAtivado:Boolean,
        tipo:String,
    },
    {
        timestamps: true,
    }
);
export const Product = mongoose.model('Product', ProductSchema, 'product');
{
}
