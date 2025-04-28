import staticText from '@/i18n/en/static';
import { useAppDispatch } from '@/store';
import {
  resetFilters,
  setCategoriesFilter,
  setPriceRangeFilter,
  type FilterOptions,
} from '@/store/slices/productsSlice';
import type { ProductType } from '@/utils/types';
import { useMemo } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface IFiltersProps {
  categories: string[];
  products: ProductType[] | null;
  filters: FilterOptions;
  priceRangeLimits: {
    min: number;
    max: number;
  };
}

export default function Filters({
  categories,
  products,
  filters,
  priceRangeLimits,
}: IFiltersProps) {
  const dispatch = useAppDispatch();

  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    categories.forEach((category) => {
      counts[category] = products?.filter((p) => p.category === category).length || 0;
    });
    return counts;
  }, [products, categories]);

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setPriceRangeFilter({ min: newValue[0], max: newValue[1] }));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((cat) => cat !== category);
    dispatch(setCategoriesFilter(updatedCategories));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <fieldset data-testid="products-filters" className="border border-gray-300 px-2">
      <legend>{staticText.short.productsFilters}</legend>
      <FormControl
        variant="outlined"
        fullWidth
        className="mb-4 flex !flex-row items-center justify-between gap-4"
      >
        <div>
          <Typography variant="subtitle1">{staticText.short.categories}</Typography>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              return (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={filters.categories.includes(category)}
                      onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    />
                  }
                  label={`${category} (${categoryCounts[category]})`}
                />
              );
            })}
          </div>
        </div>
        <div>
          <Typography variant="subtitle1">
            {staticText.short.priceRange}: {filters.priceRange.min} - {filters.priceRange.max}
          </Typography>
          <Slider
            value={[filters.priceRange.min, filters.priceRange.max]}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={priceRangeLimits.min}
            max={priceRangeLimits.max}
            step={1}
            className="w-48"
          />
        </div>
        <Button variant="outlined" onClick={handleResetFilters}>
          {staticText.short.resetFilters}
        </Button>
      </FormControl>
    </fieldset>
  );
}
