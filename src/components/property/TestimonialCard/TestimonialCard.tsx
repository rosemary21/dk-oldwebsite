interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  img: string;
}

export default function TestimonialCard({
  name,
  location,
  testimonial,
  img,
}: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <span className="testimonialStars">
        <i className="bx bxs-star" />
        <i className="bx bxs-star" />
        <i className="bx bxs-star" />
        <i className="bx bxs-star" />
        <i className="bx bxs-star" />
      </span>
      <p className="testimonial">{testimonial}</p>
      <div className="testimonial-person">
        <img src={img} alt={`${name.trim()}-img`} />
        <span>
          <h4>{name}</h4>
          <p>{location}</p>
        </span>
      </div>
    </div>
  );
}
