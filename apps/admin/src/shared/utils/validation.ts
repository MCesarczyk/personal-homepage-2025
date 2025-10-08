import { z } from "zod";

export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function safeParseData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): T | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}

export function formatValidationErrors(
  errors: z.ZodError,
): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  errors.issues.forEach((error) => {
    const path = error.path.join(".");
    formattedErrors[path] = error.message;
  });

  return formattedErrors;
}

export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => {
    const result = validateData(schema, data);
    if (!result.success) {
      throw new Error(
        `Validation failed: ${JSON.stringify(formatValidationErrors(result.errors))}`,
      );
    }
    return result.data;
  };
}
