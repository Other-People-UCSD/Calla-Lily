import { useEffect, useRef, useState } from "react";
import styles from '@/styles/carousel.module.scss';;
import Link from "next/link";
import { default as SlickSlider } from "react-slick";
import OPMparser from "@/lib/OPMparser";
import Image from "next/image";

export function CarouselSlickDesktop({ collectionEntries = [] }) {
  const [hasMounted, setMounted] = useState(false);
  const desktopRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!hasMounted) {
    return;
  }

  const settings = {
    arrows: false,
    dots: false,
    centerMode: false,
    infinite: true,
    slidesToShow: 1,
    className: `${styles.desktop}`,
  }

  const handlePrev = () => {
    desktopRef.current.slickPrev();
  }
  const handleNext = () => {
    desktopRef.current.slickNext();
  }

  return (
    <div className={styles.desktop__container}>
      <div className={styles.desktop__wrapper}>
        <button
          className={styles.btn__prev}
          onClick={handlePrev}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>View Previous Collection</title>
            <path fill="inherit" fill-opacity="0.75" d="M0.488171 8.42875C0.0976658 8.03821 0.0976963 7.40504 0.488241 7.01454L6.85251 0.650888C7.24306 0.260383 7.87622 0.260414 8.26673 0.650957C8.65723 1.0415 8.6572 1.67467 8.26666 2.06517L2.60953 7.72175L8.2661 13.3789C8.65661 13.7694 8.65658 14.4026 8.26604 14.7931C7.87549 15.1836 7.24233 15.1836 6.85182 14.793L0.488171 8.42875ZM21.1952 8.72266L1.19526 8.72168L1.19536 6.72168L21.1953 6.72266L21.1952 8.72266Z" />
          </svg>
        </button>

        <button
          className={styles.btn__next}
          onClick={handleNext}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>View Next Collection</title>
            <path fill="inherit" fill-opacity="0.75" d="M20.9493 8.48834C21.3398 8.09781 21.3398 7.46464 20.9493 7.07413L14.5852 0.71032C14.1946 0.319806 13.5615 0.319821 13.1709 0.710355C12.7804 1.10089 12.7804 1.73405 13.171 2.12457L18.828 7.78128L13.1713 13.4383C12.7807 13.8288 12.7808 14.462 13.1713 14.8525C13.5618 15.243 14.195 15.243 14.5855 14.8525L20.9493 8.48834ZM0.242304 8.78174L20.2422 8.78125L20.2422 6.78125L0.242255 6.78174L0.242304 8.78174Z" />
          </svg>
        </button>

        <SlickSlider ref={desktopRef} {...settings} >
          {collectionEntries.map((item, idx) => {
            return <div key={idx}>
              <div className={styles.desktop__slide__item}>
                <div className={styles.desktop__cover_frame}>
                  <div className={styles.block__img__container}>
                    <Image className={`${styles.img__cover}`}
                      src={item.image_cover} fill={true}
                      sizes='624px'
                      alt={item.image_alt} />
                    <p className={styles.block__img__caption}>{item.image_caption}</p>
                  </div>
                </div>
                <div className={styles.desktop__contentbox}>
                  <div className={styles.desktop__content__title}>Collection No. {item.collection_num} | <strong>{item.collection_theme}</strong></div>
                  <div className={styles.desktop__editorsnote}>
                    <OPMparser content={item.editors_note_text} depth={0} />
                    <Link href={item.editors_note_link}>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          })}
        </SlickSlider>
      </div>
    </div>
  )
}
export function CarouselSlickMobile({ collectionEntries = [] }) {
  const [hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!hasMounted) {
    return;
  }

  const settings = {
    arrows: false,
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    className: `${styles.mobile}`,
    appendDots: dots => {
      return <div className={styles.mobile__scroll__dot}>
        {dots}
      </div>
    },
    dotsClass: `${styles.mobile__scroll__container}`,
  }

  return (
    <SlickSlider {...settings} >
      {collectionEntries.map((item, idx) => {
        return <Link key={idx}
          href={item.editors_note_link}
          className={styles.mobile__item}>
          <div className={styles.mobile__item__wrapper}>
            <p className={styles.mobile__item__content__title}>Collection No. {item.collection_num} | <strong>{item.collection_theme}</strong> </p>
            <div className={styles.mobile__item__bg}
              style={{ backgroundImage: `url(${item.image_cover})` }}>
            </div>
          </div>
        </Link>
      })}
    </SlickSlider>
  )
}