import express from 'express';
import controller from '../controllers/product';
// import productValidate from '../validator/product';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// validation middleware
// const productValidate = [
//   body('name')
//     .isLength({ min: 2, max: 50 })
//     .withMessage(
//       'Product name should be longer than 2 and shorter than 50 characters.'
//     ),
//   body('brand')
//     .isLength({ min: 2, max: 50 })
//     .withMessage(
//       'Product brand should be longer than 2 and shorter than 50 characters.'
//     ),
//   body('corporation')
//     .isLength({ min: 2, max: 50 })
//     .withMessage(
//       'Product brand should be longer than 2 and shorter than 50 characters.'
//     ),
//   body('barcode')
//     .isLength({ min: 4, max: 18 })
//     .withMessage(
//       'Barcode should be longer than 4 and shorter than 18 characters.'
//     ),
//   body('state')
//     .isLength({ min: 2, max: 50 })
//     .withMessage(
//       'State should be longer than 4 and shorter than 18 characters.'
//     )
// ];

router.get('/get/products', controller.getAllProducts);
router.post('/create/product', controller.createProduct);

export = router;
