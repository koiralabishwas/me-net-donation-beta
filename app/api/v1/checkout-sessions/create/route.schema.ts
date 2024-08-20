import { z } from "zod";

export const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  is_public : z.boolean(),
  display_name : z.string().optional(),
  corporate_no : z.string().optional(),
  message : z.string(),
  address: z.object({
    country: z.string(),
    postal_code: z.string(),
    city: z.string(),
    line1: z.string(),
    line2: z.string(),
  }),
});
export const requestBodySchema = z.object({
    customer: customerSchema,
    product_id: z.string(),
    price: z.number(),
  });


