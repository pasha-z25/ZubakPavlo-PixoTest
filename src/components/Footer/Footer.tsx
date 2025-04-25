import staticText from '@/i18n/en/static';

import Typography from '@mui/material/Typography';

export default async function Footer() {
  return (
    <footer className="footer border-t border-t-gray-300 py-4">
      <div className="container mx-auto px-4">
        <Typography>
          {new Date().getFullYear()} &copy; {staticText.long.footerDescription}
        </Typography>
      </div>
    </footer>
  );
}
