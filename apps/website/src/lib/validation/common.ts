import { z } from "zod";

export const idSchema = z.string().min(1, "ID is required");

export const urlSchema = z.url("Must be a valid URL").optional().or(z.literal(""));

export const dateSchema = z.union([z.iso.datetime(), z.date(), z.string().transform((str) => new Date(str))]);

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  offset: z.number().int().nonnegative().optional(),
});

export const apiResponseSchema = <T>(dataSchema: z.ZodSchema<T>) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().default(true),
  });

export const apiErrorSchema = z.object({
  message: z.string(),
  field: z.string().optional(),
  code: z.string().optional(),
  statusCode: z.number().optional(),
});
