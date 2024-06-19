import { useEffect, useState } from "react";
import carouselStyles from '@/styles/carousel.module.scss';;
import Link from "next/link";
import { default as SlickSlider } from "react-slick";

export function CarouselSlickMobile({ collectionEntries = [], numResults }) {
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
      {collectionEntries.map((item, idx) => {
        return <Link key={idx}
          href={item.editors_note_link}
          className={carouselStyles.mobile__item}>
            <div className={carouselStyles.mobile__item__wrapper}>

            
          <p className={carouselStyles.mobile__item__content__title}>Collection No. {item.collection_num} | <strong>{item.collection_theme}</strong> </p>
          <div className={carouselStyles.mobile__item__bg}
            style={{ backgroundImage: `url(${item.image_cover})` }}>
          </div>
          </div>
        </Link>
      })}

      {/* {collectionEntries.splice(0, numResults).map((item, idx) => {
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
      })} */}
    </SlickSlider>
  )
}