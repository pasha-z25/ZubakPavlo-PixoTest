import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { z } from 'zod';

export const PiiCartFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Too Short Name' }),
  email: z
    .string()
    .min(1, { message: 'The Field Has To Be Filled' })
    .email({ message: 'Not Valid Email' }),
  phone: z
    .string()
    .refine((phone) => isMobilePhone(phone), {
      message: 'Not Valid Phone',
    })
    .optional(),
  address: z.string().optional(),
});

export type PiiCartFormType = z.infer<typeof PiiCartFormSchema>;

export const PiiCartFormDefaultValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
};
