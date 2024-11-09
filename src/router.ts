import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middlewares";

const router = Router();

//Routing
router.get("/", getProduct);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .notEmpty()
    .withMessage("El precio no puede ir vacío")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .notEmpty()
    .withMessage("El precio no puede ir vacío")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability").isBoolean().withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

export default router;
