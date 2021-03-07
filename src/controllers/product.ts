import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import mongoose from 'mongoose';

const getAllProducts = (req: Request, res: Response) => {
  Product.find()
    // .select('_id name brand corporation barcode state')
    .exec()
    .then((results) => {
      return res.status(200).json({
        count: results.length,
        products: results.map((product) => {
          return {
            _id: product._id,
            name: product.name,
            brand: product.brand,
            corporation: product.corporation,
            barcode: product.barcode,
            state: product.state,
            request: {
              type: 'GET',
              url:
                'http://localhost:1337/api/products/get/product/' + product._id
              // for finding product later, change address to config env
            }
          };
        })
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const getProduct = (req: Request, res: Response) => {
  Product.find({ barcode: req.params.barcode })
    .exec()
    .then((product) => {
      res.status(200).json({ product: product });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const createProduct = (req: Request, res: Response) => {
  let { name, brand, corporation, barcode, state, extraInformation } = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    brand,
    corporation,
    barcode,
    state,
    extraInformation
  });
  return product
    .save()
    .then((result) => {
      return res.status(201).json({
        book: result
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

// TODO fix the response
const deleteProduct = (req: Request, res: Response) => {
  Product.deleteOne({ barcode: req.params.barcode })
    .exec()
    .then((product) => {
      res.status(200).json('poof');
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

export default { getAllProducts, getProduct, createProduct, deleteProduct };
