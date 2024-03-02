import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import navStyles from '@/styles/nav.module.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const delta = 5;

/**
 * This is the header with the MobileNav menu nested within it. 
 * @returns 
 */
export default function HeaderMain() {
  const headerRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  /**
   * Opens the mobile navigation after clicking Menu
   */
  const openNav = () => {
    document.getElementById("mobileNav").style.overflowY = "auto";
    document.querySelector("html").style.overflowY = "hidden";
    document.getElementById("mobileNav").style.height = "100%";
    setShowNav(true);
  }

  /**
   * Hide/show the header when scrolling down/up the page
   * @returns 
   */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Make sure they scroll more than delta px
    if (Math.abs(lastScrollTop - scrollY) <= delta) {
      return;
    }

    // If they scrolled down and are past the navbar, 
    // add class .nav-up by rerendering state.
    // This is necessary so you never see what is "behind" the navbar.
    if (scrollY > lastScrollTop && scrollY > headerRef.current?.offsetHeight) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollTop(scrollY);
  }, [lastScrollTop]);

  /**
   * Add scroll listener to window
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  /**
   * Closes the mobile navigation after clicking Close or a search result.
   * Func passed down to MobileNav and Search components as a prop
   */
  const closeNav = () => {
    document.getElementById("mobileNav").style.height = "0%";
    document.querySelector("html").style.overflowY = "initial";
    setShowNav(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        onScroll={handleScroll}
        className={`${styles.base} ${showHeader ? '' : styles["nav-up"]}`}
      >
        <Link href="/" className={styles.logo} aria-label="Go to Homepage">O P _</Link>
        <div className={styles.toolbar}>
          <Link href="/search" className={styles.search__wrapper} aria-label="Open Search">
            <svg className={styles.search__icon}><use href="/svg/accents.svg#search-icon" /></svg>
          </Link>
          <button className={styles.menu} onClick={openNav} aria-label="Open Menu">Menu</button>
        </div>

      </header>
      <div
        id='mobileNav'
        className={navStyles.overlay}>
        {showNav &&
          <div className={styles.overlay__header}>
            <Link href="/" onClick={closeNav} className={styles.logo} aria-label="Go to Homepage">O P _</Link>
            <div className={styles.toolbar}>
              <button
                className={styles.menu__close}
                onClick={closeNav}
                aria-label="Close Menu">Close</button>
            </div>
          </div>
        }
        {showNav && <MobileNav setShowNav={setShowNav} closeNav={closeNav} />}
      </div>
    </>
  );
}

/**
 * This is the nav menu shown when Menu is clicked.
 * @param {state} setShowNav 
 * @returns 
 */
function MobileNav({ closeNav }) {
  /**
 * Gets the current year in the format YYYY
 * @returns The current year
 */
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <>
      <nav className={navStyles.nav__content}>
        <div className={navStyles.genres}>
          <h3>Genres</h3>
          <ul className={navStyles.nav__list} aria-label="Genres">
            <li><Link href="/poetry" onClick={closeNav}>Poetry</Link></li>
            <li><Link href="/fiction" onClick={closeNav}>Fiction</Link></li>
            <li><Link href="/nonfiction" onClick={closeNav}>Nonfiction</Link></li>
            <li><Link href="/visualarts" onClick={closeNav}>Visual Arts</Link></li>
          </ul>
        </div>

        <div>
          <h3>Info</h3>
          <ul className={navStyles.nav__list} aria-label="info">
            <li><Link href="/about" onClick={closeNav}>About Us</Link></li>
            <li><Link href="/submissions" onClick={closeNav}>Submissions</Link></li>
            <li><Link href="/uc-magazines" onClick={closeNav} aria-label="Community">Community &lt;3</Link></li>
            <li><a href="https://issuu.com/otherpeoplesd" target="_blank" rel="noopener noreferer"
              className={navStyles.external}>Issuu <ArrowForwardIcon fontSize='inherit' /></a></li>
          </ul>
        </div>
      </nav>

      <div className={navStyles.footer}>
        <svg className={styles.opm__logo}><use href="/svg/accents.svg#logo-vd-op-text" /></svg>
        <p>{`Other People © ${getYear()}`} <br />ALL RIGHTS RESERVED</p>
      </div>
    </>
  );
}