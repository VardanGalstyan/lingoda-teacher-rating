const Header = () => {
  return (
    <header className="py-4 uppercase bg-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl flex mx-auto px-8  justify-between items-center">
        <img
          src="https://avatars.githubusercontent.com/u/5747562?s=280&v=4"
          alt=""
          className="size-8"
        />
        <div className="font-bold tracking-widest">Teachers list</div>
      </div>
    </header>
  );
};
export default Header;
