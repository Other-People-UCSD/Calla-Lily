import Link from 'next/link';
import styles from '@/styles/footer.module.scss';

const col1 = [
  {
    "name": "Issuu ->",
    "link": "https://issuu.com/otherpeoplesd",
    "outbound": true
  }];

const col2 = [
  {
    "name": "Poetry",
    "link": "/poetry",
    "outbound": false
  },
  {
    "name": "Fiction",
    "link": "/fiction",
    "outbound": false
  },
  {
    "name": "Nonfiction",
    "link": "/nonfiction",
    "outbound": false
  },
  {
    "name": "Visual Arts",
    "link": "/visualarts",
    "outbound": false
  },
  {
    "name": "Search",
    "link": "/search",
    "outbound": false
  },
]

const col3 = [
  {
    "name": "About",
    "link": "/about",
    "outbound": false
  },
  {
    "name": "Team Applications",
    "link": "/about#team",
    "outbound": false
  },
  {
    "name": "Submissions",
    "link": "/submissions",
    "outbound": false
  },
  {
    "name": "Community <3",
    "link": "/uc-magazines",
    "outbound": false
  },
]

const col4 = [
  {
    "name": "Instagram",
    "link": "/",
    "outbound": true
  },
  {
    "name": "Facebook",
    "link": "/",
    "outbound": true
  },
  {
    "name": "Discord",
    "link": "/",
    "outbound": true
  },
  {
    "name": "Email",
    "link": "/",
    "outbound": false
  },
]

const defaultConfig = {
  'showGradient': true,
  'showMore': true,
}

export default function Footer({ pageType, footerConfig }) {
  // Updates values in the defaultConfig if they are provided in footerConfig
  const config = { ...defaultConfig, ...footerConfig }

  function getYear() {
    return new Date().getFullYear();
  }

  const gradient = config.showGradient ? `${styles.gradient}` : '';

  return (
    <footer className={`${styles.base} ${gradient}`}>
      <div className={styles.base__content}>

        {
          !pageType && config.showMore !== false &&
          <>
            <div className={styles.more} >
              <p className={`${styles.more__block__heading} text--heading_2`}>More Information</p>
              <hr />
              <div className={styles.more__grid}>
                <div className={styles.more__block}>
                  <p className={`${styles.more__block__heading} text--heading_2`}>Submissions Info</p>
                  <p>Our Editorial team reviews submissions individually and votes on their favorite pieces based on quality, creativity, craft, and style. The team then convenes to determine the strongest pieces of the selection, the number of which is adjusted to fit the maximum length of the magazine publication.</p>
                  <p>For detailed submissions instructions, please see our Submissions page.</p>
                </div>

                <div className={styles.more__block}>
                  <p className={`${styles.more__block__heading} text--heading_2`}>Team Applications</p>
                  <p></p>
                  <ul className={styles.team__app__list}>
                    <li>
                      <p>Editorial & Content</p>
                      <a href="">[Apply Here!]</a>
                    </li>
                    <li>
                      <p>Design & Social Media</p>
                      <a href="">[Apply Here!]</a>
                    </li>
                    <li>
                      <p>Event Planning</p>
                      <a href="">[Apply Here!]</a>
                    </li>
                    <li>
                      <p>Web Dev/UI/UX</p>
                      <a href="">[Apply Here!]</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.newsletter} id="mc_embed_signup">
              <form action="https://gmail.us4.list-manage.com/subscribe/post?u=4b1b080bf138808842bdfbe2b&amp;id=32695fe3bf" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                  <label htmlFor="mce-EMAIL"
                    className={`${styles.newsletter__label} text--heading_2`}>
                    Sign Up For Our Newsletter!
                  </label>

                  <hr />

                  <div className={styles.newsletter__inputbox}>
                    <input
                      type="email"
                      defaultValue=""
                      name="EMAIL"
                      id="mce-EMAIL"
                      placeholder="EMAIL"
                      required
                      className={styles.newsletter__input__email} />


                    {/* <real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                    <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                      <input type="text" name="b_4b1b080bf138808842bdfbe2b_32695fe3bf" tabIndex="-1" defaultValue="" />
                    </div>

                    <input
                      type="submit"
                      value="SIGN UP!"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className={styles.newsletter__submit}
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        }



        <div className={styles.nav}>
          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Our Prints</p>
            <FooterList col={col1} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Explore Content</p>
            <FooterList col={col2} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Other Resources</p>
            <FooterList col={col3} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Follow Us!</p>
            <FooterList col={col4} />
          </div>
        </div>
        <div className={styles.base__copyright}>
          <FooterLogo className={styles.opm__logo} />
          <p className={styles.base__copyright__text}>
            {`© ${getYear()} All Rights Reserved`}<br />
            Version 4.5.9<br />
            Calla-Lily
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ col }) {
  return (
    <ul className={styles.nav__list}>
      {
        col.map((item, idx) => {
          return <li key={idx} className={styles.nav__list__item}>
            {
              item.outbound ? (
                <a href={item.link} target="_blank" rel="noreferer noopener">{item.name}</a>
              ) : (
                <Link href={item.link}>{item.name}</Link>
              )
            }
          </li>
        })
      }
    </ul>
  )
}

export const FooterLogo = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 1200 761.3"
      {...props}>
      <path
        d="M688.4 26.2c-31.3 0-61.1 6.1-88.4 17.1-27.3-11-57.1-17.1-88.4-17.1-130.2 0-235.7 105.5-235.7 235.7s105.5 235.7 235.7 235.7c31.3 0 61.1-6.1 88.4-17.1 27.3 11 57.1 17.1 88.4 17.1 130.2 0 235.7-105.5 235.7-235.7S818.5 26.2 688.4 26.2zM511.6 488.6c-125 0-226.7-101.7-226.7-226.7 0-125 101.7-226.7 226.7-226.7 26.9 0 52.7 4.7 76.6 13.3-80.1 37.7-135.5 119-135.5 213.4s55.4 175.7 135.5 213.4c-23.9 8.6-49.7 13.3-76.6 13.3zm176.8 0c-26.9 0-52.7-4.7-76.6-13.3 80.1-37.7 135.5-119 135.5-213.4S691.9 86.2 611.8 48.5c23.9-8.6 49.7-13.3 76.6-13.3 125 0 226.7 101.7 226.7 226.7 0 125-101.7 226.7-226.7 226.7zM41.6 735.1c-13.5 0-23.8-4.2-30.9-12.6C3.6 714 0 703.2 0 690s3.6-24 10.7-32.5c7.1-8.4 17.4-12.6 30.9-12.6 13.4 0 23.7 4.2 30.8 12.6 7.2 8.4 10.7 19.2 10.7 32.5 0 13.2-3.6 24-10.7 32.5-7.2 8.3-17.4 12.6-30.8 12.6zm-18-23.6c4 5.2 10 7.8 18 7.8s13.9-2.6 18-7.8c4-5.2 6-12.4 6-21.5s-2-16.3-6-21.5c-4-5.2-10-7.9-18-7.9s-13.9 2.6-18 7.9c-4 5.2-6 12.4-6 21.5s2 16.3 6 21.5zM141.1 733.9v-72.3h-25.9V646h69.1v15.6h-25.9v72.3h-17.3zM277.3 646h17.2v87.9h-17.2v-37.7h-38.1v37.7H222V646h17.2v34.8h38.1V646zM339.4 733.9V646h60.9v15.4h-43.7v19.5h39.8v15.3h-39.8v22.4h43.7v15.3h-60.9zM491.4 699.8l21.9 32.9v1.3h-19.8l-20.2-32.1h-14.8V734h-17.2v-88h38.6c9 0 16.1 2.6 21.4 7.9s8 11.8 8 19.6c0 6.4-1.6 11.8-4.8 16.4-3.4 4.6-7.7 7.9-13.1 9.9zm-33.1-38.3v25h20.5c4.2 0 7.3-1.2 9.4-3.6 2.1-2.4 3.1-5.5 3.1-9.2 0-3.5-1.1-6.4-3.2-8.7-2.1-2.3-5.3-3.5-9.4-3.5h-20.4zM611.4 733.9V646h37.7c8.8 0 15.8 2.7 21.1 8 5.3 5.4 7.9 12.2 7.9 20.6 0 8.5-2.7 15.5-8 21-5.3 5.4-12.3 8.2-21 8.2h-20.5v30.1h-17.2zm17.2-45.6H646c9.7 0 14.6-4.6 14.6-13.7 0-4.3-1.3-7.6-3.8-9.9-2.6-2.3-6.1-3.5-10.7-3.5h-17.3v27.1zM718 733.9V646h60.9v15.4h-43.7v19.5H775v15.3h-39.8v22.4h43.7v15.3H718zM856.3 735.1c-13.5 0-23.8-4.2-30.9-12.6-7.1-8.4-10.7-19.2-10.7-32.5 0-13.2 3.6-24 10.7-32.5 7.1-8.4 17.4-12.6 30.9-12.6 13.4 0 23.7 4.2 30.8 12.6 7.2 8.4 10.7 19.2 10.7 32.5 0 13.2-3.6 24-10.7 32.5-7.1 8.3-17.4 12.6-30.8 12.6zm-18-23.6c4 5.2 10 7.8 18 7.8s13.9-2.6 18-7.8c4-5.2 6-12.4 6-21.5s-2-16.3-6-21.5c-4-5.2-10-7.9-18-7.9s-13.9 2.6-18 7.9c-4 5.2-6 12.4-6 21.5s2 16.3 6 21.5zM937.8 733.9V646h37.7c8.8 0 15.8 2.7 21.1 8 5.3 5.4 7.9 12.2 7.9 20.6 0 8.5-2.7 15.5-8 21-5.3 5.4-12.3 8.2-21 8.2H955v30.1h-17.2zm17.2-45.6h17.3c9.7 0 14.6-4.6 14.6-13.7 0-4.3-1.3-7.6-3.8-9.9-2.6-2.3-6.1-3.5-10.7-3.5H955v27.1zM1044.4 733.9V646h17.2v72.5h40.6v15.4h-57.8zM1139.1 733.9V646h60.9v15.4h-43.7v19.5h39.8v15.3h-39.8v22.4h43.7v15.3h-60.9z"
        className="logoOutline"
      />
    </svg>
  );
}