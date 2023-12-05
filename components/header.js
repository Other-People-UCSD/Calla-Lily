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
        <Link href="/" className={styles.logo}><Logo64 /></Link>
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

  return <svg width="41" height="44" viewBox="0 0 41 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.5 17C38.5 24.9403 31.8531 31.5 23.5 31.5C15.1469 31.5 8.5 24.9403 8.5 17C8.5 9.05969 15.1469 2.5 23.5 2.5C31.8531 2.5 38.5 9.05969 38.5 17Z" stroke={themeColor} strokeWidth="5" />
    <line y1="-2.5" x2="17.194" y2="-2.5" transform="matrix(-0.684767 0.728762 -0.746998 -0.664826 11.7739 28)" stroke={themeColor} strokeWidth="5" />
  </svg>
}