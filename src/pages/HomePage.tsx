import { Banner } from "../components/HomeBanner/Banner";
import { HomeInfo } from "../components/HomeInfo/HomeInfo";

export const HomePage: React.FC = () => {
  return (
    <section>
      <Banner />
      <HomeInfo />
    </section>
  );
};
