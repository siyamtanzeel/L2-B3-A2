import { z } from "zod";

const inventoryValidationSchema = {
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a number",
  }),
  inStock: z.boolean({
    required_error: "inStock info is required",
    invalid_type_error: "inStock must be a boolean",
  }),
};
const variantsValidationSchema = z
  .object({
    type: z
      .string({
        required_error: "Variant type is required",
        invalid_type_error: "Variant type must be a string",
      })
      .trim(),
    value: z.string({
      required_error: "Variant Value is required",
      invalid_type_error: "Variant Value must be a string",
    }),
  })
  .strict();
const productValidationSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .trim(),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .trim(),
    price: z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .trim(),
    tags: z
      .array(
        z.string({
          message: "tag must be a string",
        })
      )
      .nonempty({ message: "There must be at least one tag" }),
    variants: z
      .array(variantsValidationSchema)
      .nonempty({ message: "There must be at least one variant" }),
    inventory: z.object(inventoryValidationSchema),
  })
  .strict();
export default productValidationSchema;
