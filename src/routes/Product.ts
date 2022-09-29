 import express from 'express';
 import ProductController from '../controllers/ProductControllers';
 const ProductRoutes = express.Router();
 
 ProductRoutes.post('/new', ProductController.create);
 ProductRoutes.put('/update', ProductController.update);
 ProductRoutes.get('/list', ProductController.index);
 ProductRoutes.post('/find', ProductController.findOne);
 ProductRoutes.post('/delete', ProductController.delete);
 
 export default ProductRoutes;
 