import { Request, Response } from "express";
import Product from "../models/Product.model";
import color from "colors";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
      // attributes: { exclude: ["updatedAt", "availability"] }, //Can restrict some parameters in the call, passwords for example
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  // console.log(color.america(req.params.id));
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Producto no entontrado" });
      return;
    }
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no entontrado" });
      return;
    }
    //Update
    await product.update(req.body);
    await product.save();

    res.json({ Product: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no entontrado" });
      return;
    }
    //Update
    // await product.update(req.body);
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ Product: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no entontrado" });
      return;
    }
    await product.destroy();
    res.json({ message: "Producto borrado" });
  } catch (error) {
    console.log(error);
  }
};
