import { useEffect, useState } from "react";
import styles from '@/styles/header.module.scss';
import animationStyles from '@/styles/animations.module.scss';

/**
 * Header.js
 * Changes the page theme based on user preference and persist through local storage. 
 * @returns Toggle Switch component
 */
export default function ThemeToggle() {
  const [isDarkTheme, setCurrentTheme] = useState(false);

  useEffect(() => {
    if (window?.localStorage?.getItem('data-theme') === 'dark' ||
      window?.matchMedia('(prefers-color-scheme: dark)').matches ||
      document?.documentElement?.getAttribute('data-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setCurrentTheme(true);
    }
  }, []);

  function handleTheme() {
    const curTheme = isDarkTheme;
    if (curTheme) {
      document?.documentElement?.setAttribute('data-theme', 'light');
      window?.localStorage?.setItem('data-theme', 'light');
    } else {
      document?.documentElement?.setAttribute('data-theme', 'dark');
      window?.localStorage?.setItem('data-theme', 'dark');
    }
    setCurrentTheme(!isDarkTheme);
  }

  const slideClass = isDarkTheme ? `${styles['theme__logo--dark']} ${animationStyles['slide--horizontal']}` : '';

  return (
    <>
      <button onClick={handleTheme} className={`${styles.theme__btn}`}>
        <svg className={`${styles.theme__logo} ${slideClass}`}>
          <use href={`/svg/sprites.svg#vd-fill`} />
        </svg>
        <div className={styles.theme__btn__wrapper}>

          <svg className={`${styles.theme__star} ${animationStyles.fadeIn}`}>
            <use href={`/svg/sprites.svg#theme-stars`} />
          </svg>
          <svg className={`${styles.theme__sun} ${animationStyles.fadeIn}`}>
            <use href={`/svg/sprites.svg#theme-sun`} />
          </svg>
        </div>
      </button>
    </>
  );
}

/**
 * [...slug].js
 * Executes every time a post is loaded.
 * If the user's preference is dark-mode, then don't forcibly change the theme.
 * If the user's preference is light-mode or indeterminate 
 * and a work should be viewed in dark-theme, change the theme.
 */
export function pageChange(theme) {
  const isAlreadyDark = (window?.matchMedia('(prefers-color-scheme: dark)').matches ||
      document?.documentElement?.getAttribute('data-theme') === 'dark');
  if (theme === 'dark' && !isAlreadyDark) {
      document?.documentElement?.setAttribute('data-theme', 'dark');
  } else if (!isAlreadyDark) {
      document?.documentElement?.setAttribute('data-theme', 'light');
  }
}