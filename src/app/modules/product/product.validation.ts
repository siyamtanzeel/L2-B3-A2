import { z } from "zod";

const inventoryValidationSchema = z.object({
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a number",
  }),
  inStock: z.boolean({
    required_error: "inStock info is required",
    invalid_type_error: "inStock must be a boolean",
  }),
});
const variantsValidationSchema = z.array(
  z.object({
    type: z.string().min(1, "Variant type is required"),
    value: z.string().min(1, "Variant value is required"),
  })
);
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
    price: z.number().gt(0, "price must be higher than 0"),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .trim(),
    tags: z
      .array(
        z.string({
          invalid_type_error: "tag must be a string",
          required_error: "tag must be provided",
        })
      )
      .nonempty({ message: "There must be at least one tag" }),
    variants: variantsValidationSchema,
    inventory: inventoryValidationSchema,
  })
  .strict();
export default productValidationSchema;
