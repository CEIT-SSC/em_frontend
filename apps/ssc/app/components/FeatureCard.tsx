import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: Props) => {
  return (
    <div className="w-full p-2 flex flex-col justify-between items-center gap-4 overflow-hidden">
      <Icon size={48} />
      <h3 className="text-3xl font-bold text-center">{title}</h3>
      <p className="text-2xl text-whiteText text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
