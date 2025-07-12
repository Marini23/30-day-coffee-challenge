import Lottie from "lottie-react";
import coffeeAnimation from "../../assets/animations/Coffee Cup Loader.json";

export const CoffeeLoader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Lottie
        animationData={coffeeAnimation}
        loop
        autoplay
        className="w-48 h-48"
      />
    </div>
  );
};
