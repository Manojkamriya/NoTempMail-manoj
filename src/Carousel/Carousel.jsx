import React from "react";
import { Star } from "lucide-react"; 
import "./Carousel.css";

const testimonials = [
  {
    name: "Derloz Lill",
    img: "/img/perfil-1.png",
    rating: "5.0",
    text:
      "The company offers many easy-to-use services, with hard work and round-the-clock support on all projects."
  },
  {
    name: "Alexa Hants",
    img: "/img/perfil-2.png",
    rating: "5.0",
    text:
      "The company offers many easy-to-use services, with hard work and round-the-clock support on all projects."
  },
  {
    name: "Milar Xans",
    img: "/img/perfil-3.png",
    rating: "5.0",
    text:
      "The company offers many easy-to-use services, with hard work and round-the-clock support on all projects."
  },
  {
    name: "Devy Lots",
    img: "/img/perfil-4.png",
    rating: "5.0",
    text:
      "The company offers many easy-to-use services, with hard work and round-the-clock support on all projects."
  }
];

export default function InfiniteCarousel() {
  const duplicated = [...testimonials, ...testimonials];

  const StarRow = () => (
    <div className="carousel__stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star 
          key={s}
          size={18}
          fill="var(--first-color)"
          stroke="none"
          className="carousel__star"
        />
      ))}
    </div>
  );

  return (
    <section className="carousel">
      <div className="carousel__content">
        {duplicated.map((t, idx) => (
          <article className="carousel__card" key={`a-${idx}`}>
            <div className="carousel__image">
              <img src={t.img} alt={t.name} className="carousel__img" />
            </div>

            <h3 className="carousel__name">{t.name}</h3>

            <div className="carousel__rating">
              <StarRow />
              <h3 className="carousel__number">{t.rating}</h3>
            </div>

            <p>{t.text}</p>
          </article>
        ))}
      </div>

      <div className="carousel__content carousel__reverse">
        {duplicated.map((t, idx) => (
          <article className="carousel__card" key={`b-${idx}`}>
            <div className="carousel__image">
              <img src={t.img} alt={t.name} className="carousel__img" />
            </div>

            <h3 className="carousel__name">{t.name}</h3>

            <div className="carousel__rating">
              <StarRow />
              <h3 className="carousel__number">{t.rating}</h3>
            </div>

            <p>{t.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
