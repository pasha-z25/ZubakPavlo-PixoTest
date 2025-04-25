import staticText from '@/i18n/en/static';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PiiCartFormDefaultValues, PiiCartFormSchema, PiiCartFormType } from './schemas';

import Button from '@mui/material/Button';
import { ControlledTextField } from './components';

export default function PII({ formHandler }: { formHandler: () => void }) {
  const { control, handleSubmit } = useForm<PiiCartFormType>({
    resolver: zodResolver(PiiCartFormSchema),
    defaultValues: PiiCartFormDefaultValues,
  });

  const submitHandler = ({ fullName, email, phone, address }: PiiCartFormType) => {
    formHandler();
    console.log('Submit PII form', { fullName, email, phone, address });
    // dispatch(submitForm(JSON.stringify({email, fullName, phone, address})));
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mt-4 grid grid-cols-2 justify-center gap-4"
    >
      <ControlledTextField
        control={control}
        label={'Full Name'}
        name="fullName"
        className="col-span-2"
        required
      />
      <ControlledTextField control={control} label={'Email'} name="email" type="email" required />
      <ControlledTextField control={control} label={'Phone'} name="phone" type="tel" />
      <ControlledTextField
        control={control}
        label={'Address'}
        name="address"
        className="col-span-2"
      />
      <Button type="submit" variant="outlined" className="col-span-2">
        {staticText.button.submit}
      </Button>
    </form>
  );
}
