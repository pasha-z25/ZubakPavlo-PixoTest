import staticText from '@/i18n/en/static';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { z } from 'zod';

export const PiiCartFormSchema = z.object({
  fullName: z.string().min(2, { message: staticText.error.tooShortName }),
  email: z
    .string()
    .min(1, { message: staticText.error.hasToBeFilled })
    .email({ message: staticText.error.notValidEmail }),
  phone: z
    .string()
    .refine((phone) => isMobilePhone(phone), {
      message: staticText.error.notValidPhone,
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
