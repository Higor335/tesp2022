import { Request, Response } from 'express';
import { Product } from '../models/Product';
import * as Yup from 'yup';

// yarn add yup @types/yup
const ProductSchema = Yup.object().shape({
    name: Yup.string().required(),
    descricao:Yup.string().required(),
    username: Yup.string().required(),
    phone: Yup.string().required(),
});
const deleteUserSchema = Yup.object().shape({
    email: Yup.string().email().required(),
});

export default {
    async create(request: Request, response: Response) {
        const { name, email, username, phone, address } = request.body;

        if (
            !(await ProductSchema.isValid({
                name,
                email,
                username,
                phone,
                address,
            }))
        ) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await Product.findOne({ email });
        if (!existing) {
            const product = await Product.create({
                name,
                email,
                username,
                phone,
                address,
            });
            return response.status(200).json({
                message: 'Produto criado com sucesso',
                product,
            });
        }
        return response
            .status(201)
            .json({ message: 'Produto ja existe no BD' });
    },
    async index(request: Request, response: Response) {
        // atribui à existing
        // o retorno da chamada do método find
        // no modelo User
        const existing = await Product.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum Produto encontrado' });
        }
        return response.status(200).json(existing);
    },
    async update(request: Request, response: Response) {
        const { name, email, username } = request.body;

        const product = await Product.findOneAndUpdate(
            {
                name,
            },
            {
                email,
                username,
            }
        );
        if (product) {
            return response.status(200).json({ message: 'Produto atualizado' });
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
    async findOne(request: Request, response: Response) {
        const { name, email, username } = request.body;
        const product = await Product.find({
            $or: [{ name: name }, { email: email }, { username: username }],
        });
        if (product) {
            return response.status(200).json(product);
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
    async delete(request: Request, response: Response) {
        const { email } = request.body;

        if (!(await deleteUserSchema.isValid({ email }))) {
            return response.status(401).json({ message: 'email invalido' });
        }
        const result = await Product.findOneAndDelete({ email });
        if (result) {
            return response
                .status(200)
                .json({ message: 'Produto removido com sucesso' });
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
};
