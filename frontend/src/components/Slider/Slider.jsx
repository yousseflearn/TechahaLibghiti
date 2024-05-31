import './Slider.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
// import required modules
// import { Pagination, Navigation } from 'swiper/modules';
import { menu_list } from '../../assets/assets';

const Slider = ({ category, setCategory }) => {
  return (
    <>
      <Swiper
        slidesPerView={8}
        spaceBetween={20}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        // modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
      >
        {menu_list.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
            >
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
