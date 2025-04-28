import sprite from "../assets/symbol-defs.svg";

export type IconProps = {
  name: string;
  size?: number;
  className?: string;
  color?: string;
};

export const Icon: React.FC<IconProps> = ({ name, size, className }) => {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`${sprite}#${name}`} />
    </svg>
  );
};
