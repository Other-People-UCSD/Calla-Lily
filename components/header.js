import { useState } from 'react';
import Link from 'next/link';
import headerStyles from '@/styles/header.module.scss';
import navStyles from '@/styles/nav.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Search from './search';

export default function HeaderMain() {
  const [showNav, setShowNav] = useState(false);

  function openNav() {
    document.getElementById("myNav").style.height = "100%";
    setShowNav(true);
  }

  return (
    <>
      <header className={headerStyles["header-glob"]}>
        <div className={headerStyles["header-main"]}>
          <h2><Link href="/">Other<br /> People ©</Link></h2>
          <div className={`${headerStyles["nav-genres"]} ${navStyles["h2"]}`}>
            <Link href="/poetry">Poetry</Link> / <Link href="/fiction">Fiction</Link> / <br />
            <Link href="/nonfiction">Nonfiction</Link> / <Link href="/visualarts">Visual Arts</Link>
          </div>
          <button className={navStyles.menu} onClick={openNav} aria-label="Open Menu">Menu</button>
        </div>
      </header>
      <div id='myNav' className={navStyles.overlay}>
        {showNav ? <MobileNav setShowNav={setShowNav} /> : null}
      </div>
    </>
  );
}


export function MobileNav({ setShowNav }) {
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    setShowNav(false);
  }

  return (
    <div id="navContent" className={navStyles["overlay-content"]}>
      <div className={navStyles["overlay-header"]}>
        <h2><Link href="/">Other<br /> People ©</Link></h2>
        <div className={`${headerStyles["nav-genres"]} ${navStyles["h2"]}`}>
          <Link href="/poetry">Poetry</Link> / <Link href="/fiction">Fiction</Link> / <br />
          <Link href="/nonfiction">Nonfiction</Link> / <Link href="/visualarts">Visual Arts</Link>
        </div>
        <button id="close-notice"
          className={navStyles.closebtn}
          onClick={closeNav}
          aria-label="Close Menu">Close</button>
      </div>
      {/* <MobileNav /> */}
      <nav className={navStyles["mobile-nav"]}>
        <div className={navStyles["mobile-nav2"]}>
          <Search setShowNav={setShowNav} />
        </div>
        <div className={navStyles.genres}>
          <h3>Genres</h3>
          <ul className={navStyles["nav-menu"]}>
            <li><Link href="/poetry">Poetry</Link></li>
            <li><Link href="/fiction">Fiction</Link></li>
            <li><Link href="/nonfiction">Nonfiction</Link></li>
            <li><Link href="/visualarts">Visual Arts</Link></li>
          </ul>
        </div>
        <h3>Menu</h3>
        <ul className={navStyles["nav-menu"]}>
          <li><Link href="/about">(THE) PEOPLE</Link></li>
          <li><a href="https://issuu.com/otherpeoplesd" className={navStyles.external}>Issuu <ArrowForwardIcon fontSize='inherit' /></a></li>
          <li><Link href="/submissions">Submissions</Link></li>
          <li><Link href="/showcase">Showcase</Link></li>
          <li><Link href="/uc-magazines">UC Magazines</Link></li>
        </ul>
        <ul className={navStyles["social-footer"]}>
          <li><a href="https://www.instagram.com/otherpeoplesd/">
            <InstagramIcon /></a></li>
          <li><a href="https://www.facebook.com/otherpeoplesd/"><FacebookIcon /></a></li>
          <li><a href="mailto:otherpeopleucsd@gmail.com"></a><MailOutlineIcon /></li>
        </ul>
        <div className={navStyles["nav-footer"]}>
          <h4>{`Other People © ${getYear()}`} <br />ALL RIGHTS RESERVED</h4>
        </div>
      </nav>
    </div>
  );

  function getYear() {
    return new Date().getFullYear();
  }
}