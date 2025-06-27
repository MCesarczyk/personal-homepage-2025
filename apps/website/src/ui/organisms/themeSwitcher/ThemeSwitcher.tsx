import { MoonIcon } from "../../../assets/icons/MoonIcon";
import { SunIcon } from "../../../assets/icons/SunIcon";

interface ThemeSwitcherProps {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

export const ThemeSwitcher = ({ toggleDarkTheme }: ThemeSwitcherProps) => {
  return (
    <div className="flex justify-end relative z-10">
      <button
        className="flex items-center justify-end gap-3 text-xs h-8 p-0 border-none bg-transparent -translate-y-6"
        onClick={toggleDarkTheme}
      >
        <span className="hidden sm:block">
          <span className="hidden dark:block">DARK&nbsp;MODE&nbsp;ON</span>
          <span className="dark:hidden">LIGHT&nbsp;MODE&nbsp;ON</span>
        </span>
        <div className="flex justify-start border-2 border-current rounded-2xl w-16 h-8">
          <div className="w-1/2 transition-all duration-300 dark:translate-x-8">
            <div className="text-white hidden dark:block">
              <MoonIcon />
            </div>
            <div className="text-gray-900 dark:hidden">
              <SunIcon />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
