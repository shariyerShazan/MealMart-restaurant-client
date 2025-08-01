import { z } from "zod";

export const userRegisterSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .superRefine((val, ctx) => {
            if (val.length < 6) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must be at least 6 characters",
                });
                return; 
            }
            if (!/\d/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one number",
                });
            }
            if (!/[A-Za-z]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one letter",
                });
            }
        }),
    contact: z
        .string()
        .min(10 , "Contact must be at least 10 digit"),
});

export type registerInputState = z.infer<typeof userRegisterSchema>;


export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .superRefine((val, ctx) => {
            if (val.length < 6) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must be at least 6 characters",
                });
                return;
            }
            if (!/\d/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one number",
                });
            }
            if (!/[A-Za-z]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one letter",
                });
            }
        }),
});

export type loginInputState = z.infer<typeof userLoginSchema>;
