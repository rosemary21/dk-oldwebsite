import "./DeliveryBox.css";

interface DeliveryBoxProps {
  title: string;
  label: string;
  image: string;
}

export default function DeliveryBox({ title, label, image }: DeliveryBoxProps) {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="delivery-box box-2"
    >
      <div>
        <h2>{title}</h2>
        <span>{label}</span>
      </div>
    </div>
  );
}
