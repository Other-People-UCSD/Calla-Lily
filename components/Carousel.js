import { useEffect, useState } from "react";
import carouselStyles from '@/styles/carousel.module.scss';;
import Link from "next/link";
import { Chip } from "./PostCard";
import { default as SlickSlider } from "react-slick";

export function CarouselSlickMobile({ postEntries, group, numResults }) {
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
    infinite: true,
    slidesToShow: 1,
    className: `${carouselStyles.mobile}`,
    appendDots: dots => {
      return <div className={carouselStyles.mobile__scroll__dot}>
        {dots}
      </div>
    },
    dotsClass: `${carouselStyles.mobile__scroll__container}`,
  }

  return (
    <SlickSlider {...settings} >
      {postEntries.splice(0, numResults).map((item, idx) => {
        return <Link
          key={idx}
          href={item.slug}
          className={carouselStyles.mobile__item}>
          <div className={carouselStyles.mobile__item__bg}
            style={{ backgroundImage: `url(${item.thumbnail})` }}>
            <div className={carouselStyles.mobile__textbox}>
              <p className={carouselStyles.title}>{item.title}</p>
              <p className={carouselStyles.creator}>
                {item.contributor.split(',').map(creator => <span key={creator}>/ {creator}</span>)}
              </p>
            </div>
          </div>
          <div className={carouselStyles.chip__wrapper}>
            {item.collection ? <Chip type="collection" value={item.collection} /> : <Chip type="content" value="Content" />}
            {item.tags.map((tag) => {
              return <Chip key={tag} type="tag" value={tag} />
            })}
          </div>

        </Link>
      })}
    </SlickSlider>
  )
}


// UNUSED
export function CarouselMobile({ postEntries, group, numResults, random }) {
  const [hasMounted, setMounted] = useState(false);
  const [curItem, setCurItem] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!hasMounted) {
    return;
  }

  const groupEntries = postEntries.filter((entry) => {
    return entry.collection === group;
  });

  return (
    <div className={carouselStyles.mobile}>
      <div className={carouselStyles.mobile__track}>
        {groupEntries.splice(0, numResults).map((item, idx) => {
          return <Link
            key={idx}
            href={item.slug}
            className={carouselStyles.mobile__item}
            style={{ color: "black", backgroundImage: `url(${item.thumbnail})` }}>
            <div className={carouselStyles.mobile__textbox}>
              <p className={carouselStyles.title}>{item.title}</p>
              <p className={carouselStyles.creator}>
                {item.contributor.split(',').map(creator => <span key={creator}>/ {creator}</span>)}
              </p>
            </div>
            <div className={carouselStyles.chip__wrapper}>
              {item.collection ? <Chip type="collection" value={item.collection} /> : <Chip type="content" value="Content" />}
              {item.tags.map((tag) => {
                return <Chip key={tag} type="tag" value={tag} />
              })}
            </div>
          </Link>
        })}
      </div>
      <div className={carouselStyles.mobile__scroll__container}>
        {[...Array(numResults)].map((_, i) => {
          return <div key={i} className={carouselStyles.mobile__scroll__dot} />
        })}
      </div>
    </div>
  )
}

