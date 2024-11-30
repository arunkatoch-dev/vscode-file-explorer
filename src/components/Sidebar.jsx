import { IoDocumentsOutline } from "react-icons/io5";
import { IoIosGitPullRequest } from "react-icons/io";
import { CiSearch, CiPlay1 } from "react-icons/ci";
import { useMainContext } from "../customHooks/useMainAppContext";
const iconsCss = `w-8 h-8 text-gray-400 hover:text-gray-300 cursor-pointer `;

const Sidebar = () => {
  const appContext = useMainContext();
  const { dispatch } = appContext;
  const openExtendedSideBar = (e) => {
    e.preventDefault();
    dispatch({ type: "toggleExtendedSideBar" });
  };
  return (
    <aside className=" h-full bg-neutral-900 flex flex-col justify-between p-2">
      <div className="flex flex-col gap-9 items-center">
        <IoDocumentsOutline
          className={iconsCss}
          onClick={openExtendedSideBar}
        />
        <CiSearch className={iconsCss} />
        <IoIosGitPullRequest className={iconsCss} />
        <CiPlay1 className={iconsCss} />
      </div>
    </aside>
  );
};

export default Sidebar;
