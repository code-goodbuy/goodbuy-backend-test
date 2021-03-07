import { Router } from 'express';
import controller from '../controllers/product';

const router = Router();

// get all product
router.get('/get/products', controller.getAllProducts);
// get one product by barcode param
router.get('/get/product/:barcode', controller.getProduct);
// create one product
router.post('/create/product', controller.createProduct);
// delete one product by barcode param
router.delete('/delete/product:barcode', controller.deleteProduct);

export = router;
