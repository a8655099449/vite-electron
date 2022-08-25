import React, { FC, ReactElement, ReactNode, useEffect, useRef } from "react";
import Image from "../Image/Image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import "./swiper-bundle.min.css";
// import Swiper from "swiper";
import "./index.less";
import { IMAGE_BANNER } from "@/common/images";
interface IProps {
  children: ReactNode[];
}
const MainSwiper: FC<IProps> = ({ children }): ReactElement => {
  const dom = useRef<Slider>(null);

  return (
    <div className="main-swiper">
      <Slider ref={dom} dots infinite>
        {children}
      </Slider>
    </div>
  );
};

export default MainSwiper;
