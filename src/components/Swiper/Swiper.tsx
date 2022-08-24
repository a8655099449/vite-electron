import React, { FC, ReactElement, useEffect, useRef } from "react";
import Image from "../Image/Image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import "./swiper-bundle.min.css";
// import Swiper from "swiper";
import "./index.less";
import { IMAGE_BANNER } from "@/common/images";
interface IProps {}
const MainSwiper: FC<IProps> = (): ReactElement => {
  const dom = useRef<Slider>(null);

  useEffect(() => {}, []);

  const clickItem = (index: number) => {
    dom.current?.slickGoTo(index);
  };

  return (
    <div className="main-swiper">
      <Slider ref={dom} dots infinite>
        {Array(10)
          .fill("")
          .map((item, index) => {
            return (
              <div
                className="swiper-slide"
                onClick={(e) => {
                  clickItem(index);
                }}
                key={index}
              >
                <Image src={IMAGE_BANNER} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default MainSwiper;
