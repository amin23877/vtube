"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import { IMovie } from "@/app/types";
import ColumnItem from "./ColumnItem";

const CustomSwiper = ({ movies }: { movies: IMovie[] }) => {
  return (
    <div>
      <Swiper spaceBetween={20} slidesPerView='auto' className='!pr-[52px]'>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className='text-white !w-[300px]'>
            <ColumnItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
