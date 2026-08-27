import {z} from "zod";

export const loginSchema = z.object({
    login: z
        .string()
        .min(1, "validation.required")
        .min(3, "validation.login_min"),
    password: z
        .string()
        .min(1, "validation.required")
        .min(6, "validation.password_min"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        login: z
            .string()
            .min(1, "validation.required")
            .min(3, "validation.login_min")
            .max(32, "validation.login_max")
            .regex(/^[a-zA-Z0-9_.]+$/, "validation.login_format"),
        email: z
            .string()
            .min(1, "validation.required")
            .email("validation.email_invalid"),
        password: z
            .string()
            .min(1, "validation.required")
            .min(6, "validation.password_min"),
        confirmPassword: z
            .string()
            .min(1, "validation.required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "validation.password_mismatch",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;
