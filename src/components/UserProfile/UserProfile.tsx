import { RxAvatar } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";

export const UserProfile: React.FC = () => {
  return (
    <section className="flex flex-col p-4 pt-8 w-full h-screen mt-16 gap-4">
      <h2 className="font-bold text-espresso text-[20px] tablet:text-[24px] desktop:text-[32px] mt-2">
        Personal Information
      </h2>
      <div className="flex justify-center items-center gap-8 mb-8">
        <div className="flex justify-center items-center w-24 h-24 rounded-lg overflow-hidden border -2  border-solid border-espresso ">
          <RxAvatar className=" w-20 h-20 text-espresso" />
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <button
            type="button"
            className="flex  justify-center items-center w-30 h-8 bg-latte font-medium text-espresso flex  rounded-lg hover:bg-gold focus:bg-gold"
          >
            Upload photo
          </button>
          <p className="text-espresso  tablet:text-[24px] desktop:text-[32px]">
            JPG, GIF or PNG. 1MB max.
          </p>
        </div>
      </div>
      <form className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-2">
          <label className="text-[16px] text-espresso">First name</label>
          <input
            type="text"
            defaultValue="Maryna"
            className="text-espresso flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-espresso text-[16px]">Last name</label>
          <input
            type="text"
            defaultValue="Udovychenko"
            className="text-espresso flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-espresso text-[16px]">Email address</label>
          <input
            type="email"
            defaultValue="marina.smile1m@gmail.com"
            className=" text-espresso flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
          />
        </div>
        <div className="relative flex flex-col gap-2">
          <label className="text-espresso text-[16px]">Language</label>
          <select className=" text-espresso  appearance-none flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg bg-transparent hover:border-espresso focus:outline-none  focus:border-espresso">
            <option
              value="en"
              className="bg-secondary text-espresso borde-none hover:bg-espresso"
            >
              English
            </option>
            <option
              value="pl"
              className="bg-secondary text-espresso border-none"
            >
              Polish
            </option>
          </select>
          <FaChevronDown className="absolute right-3 top-11 text-espresso pointer-events-none fill-latte" />
        </div>
        <button
          type="submit"
          className="flex  justify-center items-center w-30 h-8 bg-latte font-medium text-espresso flex  rounded-lg hover:bg-gold focus:bg-gold"
        >
          Save changes
        </button>
      </form>
    </section>
  );
};
