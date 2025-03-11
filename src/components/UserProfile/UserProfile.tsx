import { RxAvatar } from "react-icons/rx";

export const UserProfile: React.FC = () => {
  return (
    <section className="flex flex-col p-4 pt-8 w-full h-screen mt-16 gap-4">
      <h2 className="font-bold text-espresso text-[20px] tablet:text-[24px] desktop:text-[32px]">
        Personal Information
      </h2>
      <div className="flex justify-center items-center gap-8">
        <div className="flex justify-center items-center w-24 h-24 rounded-lg overflow-hidden border -2  border-solid border-espresso ">
          <RxAvatar className=" w-20 h-20" />
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
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>First name</label>
          <input type="text" defaultValue="Maryna" />
        </div>
        <div className="flex flex-col gap-2">
          <label>Last name</label>
          <input type="text" defaultValue="Udovychenko" />
        </div>
        <div className="flex flex-col gap-2">
          <label>Email address</label>
          <input type="email" defaultValue="marina.smile1m@gmail.com" />
        </div>
        <button type="submit">Save changes</button>
      </form>
    </section>
  );
};
