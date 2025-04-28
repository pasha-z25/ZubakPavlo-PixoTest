import staticText from '@/i18n/en/static';
import { useAppDispatch } from '@/store';
import { setSortBy } from '@/store/slices/productsSlice';
import { SortBy } from '@/utils/types';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface ISortingProps {
  sortBy: SortBy;
}

export default function Sorting({ sortBy }: ISortingProps) {
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as SortBy));
  };

  return (
    <FormControl data-testid="products-sorting" variant="standard" className="-translate-y-2">
      <InputLabel id="sorting-select-label">{staticText.short.sortBy}</InputLabel>
      <Select
        labelId="sorting-select-label"
        id="sorting-select"
        value={sortBy}
        label={staticText.short.sortBy}
        onChange={handleSelectChange}
      >
        <MenuItem value={SortBy.UNSORTED}>{SortBy.UNSORTED}</MenuItem>
        <MenuItem value={SortBy.NAMEaz}>{staticText.short.nameAZ}</MenuItem>
        <MenuItem value={SortBy.NAMEza}>{staticText.short.nameZA}</MenuItem>
        <MenuItem value={SortBy.PRICE09}>{staticText.short.price09}</MenuItem>
        <MenuItem value={SortBy.PRICE90}>{staticText.short.price90}</MenuItem>
        <MenuItem value={SortBy.RATING09}>{staticText.short.rating09}</MenuItem>
        <MenuItem value={SortBy.RATING90}>{staticText.short.rating90}</MenuItem>
      </Select>
    </FormControl>
  );
}
