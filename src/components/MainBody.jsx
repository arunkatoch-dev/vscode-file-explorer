import SideBarExtended from "./SideBarExtended";
import { useMainContext } from "../customHooks/useMainAppContext";
import { FaGithub, FaLinkedin, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { memo } from "react";
import { Link } from "react-router-dom";

const MainBody = ({ children }) => {
  const appContext = useMainContext();
  const { extendedSideBarWindow } = appContext?.appState;

  return (
    <main className="w-full h-screen sm:h-[95vh] bg-neutral-950 flex">
      {children}
      {extendedSideBarWindow && <SideBarExtended />}
      <div className="w-full p-5 flex  flex-col items-center justify-center text-white">
        <h1 className="text-5xl">Hello World!</h1>
        <span className="inline-block mt-3 border-b py-2">
          ( toggle sidebar to check file explorer functionality.)
        </span>

        <ul className="flex flex-col gap-1 justify-center text-white list-disc px-2 py-4">
          <li>
            <span className="flex gap-3 items-center">
              Create Folder / File by <FaPlus />
            </span>
          </li>
          <li>Add &quot;.&quot; in your file name e.g (index.html)</li>
          <li>
            <span className="flex gap-3 items-center">
              Delete Folder by <MdDelete />
            </span>
          </li>
          <li>Double Click on File/Folder to update</li>
        </ul>

        <div className="flex flex-col gap-3 pt-3">
          <span className="text-xl">Check out below for more:</span>
          <div className="flex items-center justify-center gap-4">
            <div
              title="github Link"
              className="p-4 flex items-center justify-center border border-white rounded-full hover:border-white/20"
            >
              <Link to="https://github.com/arunkatoch-dev">
                <FaGithub className="text-2xl" />
              </Link>
            </div>
            <div
              title="LinkedIn Link"
              className="p-4 flex items-center justify-center border border-white rounded-full hover:border-white/20"
            >
              <Link to="https://www.linkedin.com/in/arunkatochdev/">
                <FaLinkedin className="text-2xl text-blue-500" />
              </Link>
            </div>
            <div
              title="Portfolio Link"
              className="p-4 flex items-center justify-center border border-white rounded-full hover:border-white/20"
            >
              <Link to="https://arunkatoch-dev.vercel.app/">
                <img src="./favicon.png" alt="portfolio link" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(MainBody);
