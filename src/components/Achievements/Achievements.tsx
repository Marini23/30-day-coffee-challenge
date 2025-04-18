import { Icon } from "../../utils/Icon";

export const Achievements: React.FC = () => {
  return (
    <ul className="grid grid-cols-3 gap-4  p-4">
      <li className="flex flex-col justify-center items-center gap-2">
        <Icon name="icon-Frame-3" size={100} />
        <p className="flex justify-center items-center text-center text-latte font-bold">
          Brew Coffee Master
        </p>
      </li>
      <li className="flex flex-col justify-center items-center gap-2">
        <Icon name="icon-Frame-2" size={100} />
        <p className="flex justify-center items-center text-center text-latte font-bold">
          World Coffee Ambassador
        </p>
      </li>
      <li className="flex flex-col justify-center items-center gap-2">
        <Icon name="icon-Frame-1" size={100} />
        <p className="flex justify-center items-center text-center text-latte font-bold ">
          Coffee Flavor Alchemist
        </p>
      </li>
    </ul>
  );
};
