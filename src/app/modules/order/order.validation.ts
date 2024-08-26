import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("invalid email address"),
  productId: z.string({
    required_error: "Product ID is required",
    invalid_type_error: "Product ID must be a string",
  }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a Number",
    })
    .gt(0, "Price Must be greater than zero"),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a Number",
    })
    .gt(0, "Quantity Must be greater than zero"),
});
