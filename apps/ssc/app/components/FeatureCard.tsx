import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: Props) => {
  return (
    <div className="flex min-w-0 flex-col items-start gap-4">
      <Icon size={28} className="text-muted" aria-hidden="true" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-base leading-8 text-muted">{description}</p>
    </div>
  );
};

export default FeatureCard;
