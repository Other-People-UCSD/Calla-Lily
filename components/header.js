import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import navStyles from '@/styles/nav.module.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Search from './search';
import { Logo64 } from '@/pages';
import { FooterLogo } from './footer';

const delta = 5;

/**
 * This is the header with the MobileNav menu nested within it. 
 * @returns 
 */
export default function HeaderMain({ landingPage, title, announcementData }) {
  const headerRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  /**
   * Opens the search after clicking the search icon
   */
  const openSearch = () => {
    document.getElementById("mobileNav").style.overflowY = "auto";
    document.getElementById("mobileNav").style.height = "100%";
    document.querySelector("html").style.overflowY = "hidden";
    setShowSearch(true);
  }
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
    if (scrollY > lastScrollTop && scrollY > headerRef.current.offsetHeight) {
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
    setShowSearch(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        onScroll={handleScroll}
        className={`${styles.base} ${showHeader ? '' : styles["nav-up"]}`}
      >
        <Link href="/" className={styles.logo}><OP_Logo /></Link>
        <div className={styles.toolbar}>
          {/* <Link href="/search" className={styles.search__wrapper}><SearchIcon /></Link> */}
          <button className={styles.search__wrapper} onClick={openSearch}><SearchIcon /></button>
          <button className={styles.menu} onClick={openNav} aria-label="Open Menu">Menu</button>
        </div>

      </header>
      <div
        id='mobileNav'
        className={navStyles.overlay}>
        {(showNav || showSearch) &&
          <div className={styles.overlay__header}>
            <Link href="/" onClick={closeNav} className={styles.logo}><Logo64 theme={'dark'} /></Link>
            <div className={styles.toolbar}>
              <button
                className={styles.menu__close}
                onClick={closeNav}
                aria-label="Close Menu">Close</button>
            </div>
          </div>
        }
        {showNav && <MobileNav setShowNav={setShowNav} closeNav={closeNav} />}
        {showSearch && <Search setShowSearch={setShowSearch} closeNav={closeNav} />}
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
  return (
    <>
      <nav className={navStyles.nav__content}>
        <div className={navStyles.genres}>
          <h3>Genres</h3>
          <ul className={navStyles.nav__list}>
            <li><Link href="/poetry" onClick={closeNav}>Poetry</Link></li>
            <li><Link href="/fiction" onClick={closeNav}>Fiction</Link></li>
            <li><Link href="/nonfiction" onClick={closeNav}>Nonfiction</Link></li>
            <li><Link href="/visualarts" onClick={closeNav}>Visual Arts</Link></li>
          </ul>
        </div>

        <div>
          <h3>Info</h3>
          <ul className={navStyles.nav__list}>
            <li><Link href="/about" onClick={closeNav}>About Us</Link></li>
            <li><Link href="/submissions" onClick={closeNav}>Submissions</Link></li>
            <li><Link href="/uc-magazines" onClick={closeNav}>Community &lt;3</Link></li>
            <li><a href="https://issuu.com/otherpeoplesd" className={navStyles.external}>Issuu <ArrowForwardIcon fontSize='inherit' /></a></li>
          </ul>
        </div>
      </nav>



      <div className={navStyles.footer}>
        <FooterLogo />
        <p>{`Other People © ${getYear()}`} <br />ALL RIGHTS RESERVED</p>
      </div>
    </>
  );

  /**
   * Gets the current year in the format YYYY
   * @returns The current year
   */
  function getYear() {
    return new Date().getFullYear();
  }
}


const SearchIcon = ({ theme }) => {
  const themeColor = (theme === 'dark') ? 'white' : '#3E3E3E';

  return <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.5 17C38.5 24.9403 31.8531 31.5 23.5 31.5C15.1469 31.5 8.5 24.9403 8.5 17C8.5 9.05969 15.1469 2.5 23.5 2.5C31.8531 2.5 38.5 9.05969 38.5 17Z" stroke={themeColor} strokeWidth="5" />
    <line y1="-2.5" x2="17.194" y2="-2.5" transform="matrix(-0.684767 0.728762 -0.746998 -0.664826 11.7739 28)" stroke={themeColor} strokeWidth="5" />
  </svg>
}

const OP_Logo = ({ theme }) => {
  const themeColor = (theme) ? '#231f20' : '#231f20';
  return <svg id="op_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
    <title>Other People Logo</title>
    <path fill={themeColor} d="M245.56,430.39q-70.8,0-108.18-44.2T100,272.52q0-69.48,37.38-113.68t108.18-44.2q70.35,0,108,44.2t37.6,113.68q0,69.48-37.6,113.67T245.56,430.39Zm-62.89-82.46q21.12,27.49,62.89,27.49t62.88-27.49q21.12-27.48,21.11-75.41T308.44,197.1q-21.1-27.48-62.88-27.49T182.67,197.1q-21.1,27.48-21.11,75.42T182.67,347.93Z" />
    <path fill={themeColor} d="M531,426.43V118.6H662.89q46.17,0,73.88,28.14t27.7,72.12q0,44.87-27.92,73.45t-73.66,28.58H591.2V426.43ZM591.2,266.8h60.69q51,0,51-47.94,0-22.43-13.42-34.51t-37.6-12.1H591.2Z" />
    <path fill={themeColor} d="M886.72,485.36V438.3H1100v47.06Z" />
  </svg>
}