import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import navStyles from '@/styles/nav.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
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
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [showAnnouncement, setShowAnnouncement] = useState(false);
  // const announcementDate = announcementData?.date;


  /**
   * Opens the mobile navigation after clicking Menu
   */
  const openNav = () => {
    document.getElementById("myNav").style.height = "100%";
    setShowNav(true);
  }

  /**
   * Hide/show the header
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

  // /**
  //  * Hides the announcement when the X is pressed
  //  */
  // const hideAnnouncement = () => {
  //   localStorage.setItem('announcement', announcementDate);
  //   setShowAnnouncement(false);

  //   gtag('event', 'close_announcement', {
  //     'announcement_date': announcementDate
  //   });
  // }

  // /**
  //  * Fire the announcement only once instead of rerendering every scroll
  //  */
  // useEffect(() => {
  //   const storedState = localStorage.getItem('announcement');
  //   if (storedState !== announcementDate) {
  //     setShowAnnouncement(true);
  //   }
  // }, [announcementDate]); // Empty dependency array only triggers this effect once

  return (
    <>
      <header
        ref={headerRef}
        onScroll={handleScroll}
        className={`${styles.base} ${showHeader ? '' : styles["nav-up"]} `}
      >
        <Link href="/" className={styles.logo}><Logo64 /></Link>
        <div className={styles.toolbar}>
          <button className={styles.searchIcon}><SearchIcon /></button>
          <button className={styles.menu} onClick={openNav} aria-label="Open Menu">Menu</button>
        </div>

      </header>
      <div id='myNav' className={navStyles.overlay}>
        {showNav ? <MobileNav setShowNav={setShowNav} /> : null}
      </div>
    </>
  );
}

/**
 * This is the nav menu shown when Menu is clicked.
 * @param {state} setShowNav 
 * @returns 
 */
function MobileNav({ setShowNav }) {
  /**
   * Closes the mobile navigation after clicking Close or a search result
   */
  const closeNav = () => {
    document.getElementById("mobileNav").style.height = "0%";
    setShowNav(false);
  }

  return (
    <>
      <div className={navStyles.overlay__header}>
        <h2><Link href="/" onClick={closeNav}>Other<br /> People ©</Link></h2>
        <div className={`${navStyles.genres__top}`}>
          <Link href="/poetry" onClick={closeNav}>Poetry</Link> / <Link href="/fiction" onClick={closeNav}>Fiction</Link> / <br />
          <Link href="/nonfiction" onClick={closeNav}>Nonfiction</Link> / <Link href="/visualarts" onClick={closeNav}>Visual Arts</Link>
        </div>
        <button
          className={navStyles.menu__close}
          onClick={closeNav}
          aria-label="Close Menu">Close</button>
      </div>

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
        <h3>Menu</h3>
        <ul className={navStyles.nav__list}>
          <li><Link href="/about">(THE) PEOPLE</Link></li>
          <li><a href="https://issuu.com/otherpeoplesd" className={navStyles.external}>Issuu <ArrowForwardIcon fontSize='inherit' /></a></li>
          <li><Link href="/submissions">Submissions</Link></li>
          <li><Link href="/uc-magazines">UC Magazines</Link></li>
        </ul>
        <ul className={navStyles.footer__socials}>
          <li><a href="https://www.instagram.com/otherpeoplesd/">
            <InstagramIcon /></a></li>
          <li><a href="https://www.facebook.com/otherpeoplesd/"><FacebookIcon /></a></li>
          <li><a href="mailto:otherpeopleucsd@gmail.com"><MailOutlineIcon /></a></li>
        </ul>
        <div className={navStyles.footer__nav}>
          <FooterLogo />
          <h4>{`Other People © ${getYear()}`} <br />ALL RIGHTS RESERVED</h4>
        </div>
      </nav>
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


const SearchIcon = () => {
  return <svg width="41" height="44" viewBox="0 0 41 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.5 17C38.5 24.9403 31.8531 31.5 23.5 31.5C15.1469 31.5 8.5 24.9403 8.5 17C8.5 9.05969 15.1469 2.5 23.5 2.5C31.8531 2.5 38.5 9.05969 38.5 17Z" stroke="#3E3E3E" strokeWidth="5" />
    <line y1="-2.5" x2="17.194" y2="-2.5" transform="matrix(-0.684767 0.728762 -0.746998 -0.664826 11.7739 28)" stroke="#3E3E3E" strokeWidth="5" />
  </svg>
}