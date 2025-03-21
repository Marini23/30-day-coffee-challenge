export const InputEmail: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor="email"
        className="text-[12px] font-medium text-espresso desktop:text-[16px]"
      >
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        autoComplete="off"
        className="w-full px-3 py-2 text-[14px] text-espresso  bg-transparent border-2 border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold  desktop:text-[18px]"
      />
    </div>
  );
};
