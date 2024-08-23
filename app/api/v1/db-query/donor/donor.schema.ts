import { Donor, donor } from "@/server/db/schema";
import { z } from "zod";



export const donorSchema = z.object({
  donor_external_id: z.string(),
  stripe_customer_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  country_code: z.string(),
  postal_code: z.string(),
  is_public: z.number(),
  display_name: z.string().optional(),
  corporate_number: z.string().optional(),
  message: z.string().optional(),
  stripe_customer_object: z.object({})
});