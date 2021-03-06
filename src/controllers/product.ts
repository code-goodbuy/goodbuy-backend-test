import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import mongoose from 'mongoose';

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .exec()
    .then((results) => {
      return res.status(200).json({
        products: results,
        count: results.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const createProduct = (req: Request, res: Response, next: NextFunction) => {
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

export default { getAllProducts, createProduct };
