import { modalStore } from "../store";

const Header = () => {
  return (
    <header className="flex justify-between px-3 py-4 uppercas">
      <div className="text-xs font-bold">Lingoda Teacher Rating List</div>
      <div className="relative flex group cursor-pointer w-fit items-center justify-center gap-x-2 px-4 sm:px-6 lg:px-8 ">
        <div
          onClick={() => modalStore.set(true)}
          className="inset-0 border z-20 border-white absolute text-white dark:group-hover:bg-lime-400 blur-3xl"
        />

        <span className="font-bold relative text-xs text-white uppercase group-hover:text-white">
          Add a Teacher
        </span>
      </div>
    </header>
  );
};
export default Header;
