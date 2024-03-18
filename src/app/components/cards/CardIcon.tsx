// components
import Image from "next/image";
// icon images
import account_balance from "../../assets/icons/account_balance.svg";
import local_offer from "../../assets/icons/local_offer.svg";
import people from "../../assets/icons/people.svg";
import school from "../../assets/icons/school.svg";

const iconMap = {
  account_balance,
  local_offer,
  people,
  school,
};

export const CardIcon = ({ subtitle, highlight, icon }: Props) => (
  <div className="card_icon">
    <div className="card_icon-holder">
      <Image
        src={iconMap[icon as keyof typeof iconMap]}
        className="card_icon-image"
        height="30"
        width="30"
        alt={`${icon.toString()} icon`}
      />
    </div>
    <div className="card_icon-desc">
      <p className="card_icon-desc-title">{subtitle}</p>
      <p className="card_icon-desc-highlight">{highlight}</p>
    </div>
  </div>
);

type Props = {
  subtitle: string;
  highlight?: string | number;
  icon: string;
};
