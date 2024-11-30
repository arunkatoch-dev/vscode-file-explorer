

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between bg-slate-950 px-4 py-2">
      <ul className="flex gap-5 text-white tracking-wide">
        <li className="hover:cursor-pointer">File</li>
        <li className="hover:cursor-pointer">Edit</li>
        <li className="hover:cursor-pointer">Selection</li>
        <li className="hover:cursor-pointer">View</li>
      </ul>
    </nav>
  );
};

export default Navbar;
