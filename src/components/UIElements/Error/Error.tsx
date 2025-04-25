import staticText from '@/i18n/en/static';

export default function Error({ message }: { message: string }) {
  return (
    <div>
      {staticText.short.error}: {message}
    </div>
  );
}
