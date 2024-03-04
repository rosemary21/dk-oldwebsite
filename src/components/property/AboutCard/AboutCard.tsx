import "./AboutCard.css"

interface AboutCardProps {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

export default function AboutCard({ id, icon, title, desc }: AboutCardProps) {
  return (
    <div className="about-Card">
      <div>{`0${id}`}</div>
      <span>
        <img src={icon} alt={title.toLowerCase()} />
        <h4>{title}</h4>
        <p>{desc}</p>
      </span>
    </div>
  );
}
