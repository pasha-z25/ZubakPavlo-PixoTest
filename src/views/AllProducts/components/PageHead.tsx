import staticText from '@/i18n/en/static';
import { PageView, type SortBy } from '@/utils/types';
import classNames from 'classnames';
import { SetStateAction } from 'react';

import { CiGrid2H, CiGrid41 } from 'react-icons/ci';

import Typography from '@mui/material/Typography';
import Sorting from './Sorting';

interface IHeadProps {
  sortBy: SortBy;
  view: PageView;
  setView: (value: SetStateAction<PageView>) => void;
}

export default function PageHead({ sortBy, view, setView }: IHeadProps) {
  return (
    <div data-testid="products-page-head" className="flex items-center justify-between gap-6">
      <Typography variant="h6" component="h2" className="crop-text page-title flex-auto">
        {staticText.short.allProducts}
      </Typography>
      <Sorting sortBy={sortBy} />
      <div className="hidden items-center justify-between gap-2 md:flex">
        <CiGrid2H
          className={classNames(
            'view-icon cursor-pointer',
            view === PageView.LIST ? 'active' : 'opacity-50'
          )}
          size={30}
          onClick={() => setView(PageView.LIST)}
        />
        <CiGrid41
          className={classNames(
            'view-icon cursor-pointer',
            view === PageView.GRID ? 'active' : 'opacity-50'
          )}
          size={30}
          onClick={() => setView(PageView.GRID)}
        />
      </div>
    </div>
  );
}
