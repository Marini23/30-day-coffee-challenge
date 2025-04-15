import CupIcon from "../../assets/cup.svg?react";
import { Icon } from "../../utils/Icon";

export const Achievements: React.FC = () => {
  return (
    <section>
      <ul>
        <li>
          <CupIcon />
        </li>
        <li>
          <Icon name="Frame-1" size={500} />
        </li>
      </ul>
    </section>
  );
};
