import Lottie from "lottie-react";
import coffeeAnimation from "../../assets/animations/Coffee Cup Loader.json";

export const CoffeeLoader = () => {
  return (
    <div className="flex justify-center items-center  h-screen w-screen">
      <Lottie
        animationData={coffeeAnimation}
        loop
        autoplay
        className="w-56 h-56"
      />
    </div>
  );
};
