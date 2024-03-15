export const CardIcon = ({ subtitle, highlight }: Props) => {
  return (
    <div className="card_icon">
      <div className="card_icon-image"></div>
      <div className="card_icon-desc">
        <p className="card_icon-desc-title">{subtitle}</p>
        <p className="card_icon-desc-highlight">{highlight}</p>
      </div>
    </div>
  );
};

type Props = {
  subtitle: string;
  highlight: string | number | undefined;
};
