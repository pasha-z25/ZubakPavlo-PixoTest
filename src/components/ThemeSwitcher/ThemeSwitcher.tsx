import { useTheme } from '@/contexts/ThemeContext';
import classNames from 'classnames';

import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

export default function Switcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggler" onClick={toggleTheme}>
      <MdOutlineDarkMode className={classNames('theme-icon', { active: theme !== 'light' })} />
      <MdOutlineLightMode className={classNames('theme-icon', { active: theme === 'light' })} />
    </div>
  );
}
