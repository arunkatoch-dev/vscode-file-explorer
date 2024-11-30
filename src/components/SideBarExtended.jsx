import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";
import { MdFolder } from "react-icons/md";
import { FaFile } from "react-icons/fa6";
import FolderElement from "./FolderElement";
import FileElement from "./FileElement";
import { useMainContext } from "../customHooks/useMainAppContext";

const SideBarExtended = () => {
  const appContext = useMainContext();
  const { explorerState } = appContext?.appState;
  const { dispatch } = appContext;
  const uniqueId = uuidv4();
  const [displayInput, setDisplayInput] = useState(false);
  const [isFolder, setIsFolder] = useState(true);
  const [inputVal, setInputVal] = useState("");

  const onAddNew = (e) => {
    e.preventDefault();
    setDisplayInput(true);
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && inputVal.length > 0) {
      isFolder
        ? dispatch({
            type: "INSERT_ON_ROOT",
            insertedItem: {
              id: uniqueId,
              isFolder: true,
              elmName: inputVal,
              nestedElms: [],
            },
          })
        : dispatch({
            type: "INSERT_ON_ROOT",
            insertedItem: {
              id: uniqueId,
              isFolder: false,
              elmName: inputVal,
            },
          });
      setInputVal("");
      setDisplayInput(false);
    }
  };

  return (
    <div className="w-80 sm:h-full bg-neutral-800 flex flex-col select-none">
      <div className="flex items-center justify-between py-2 bg-neutral-900 px-4">
        <span className="text-white">{explorerState.elmName}</span>
        <FaPlus
          title="add file/folder"
          className="text-white text-base cursor-pointer"
          onClick={onAddNew}
        />
      </div>
      <div className="w-full h-full flex flex-col overflow-y-auto">
        {displayInput && (
          <div className="w-full flex items-center justify-center gap-3">
            {isFolder ? (
              <MdFolder className="text-lg text-gray-600" />
            ) : (
              <FaFile className="text-lg text-gray-600" />
            )}
            <input
              type="text"
              title="you can add file by giving extension e.g index.html"
              className="bg-transparent border border-gray-300 outline-none px-2 w-[60%] text-white"
              onKeyDown={onAddFolder}
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (e.target.value.includes(".")) {
                  setIsFolder(false);
                } else {
                  setIsFolder(true);
                }
              }}
              onBlur={() => {
                setDisplayInput((displayInput) => !displayInput);
                setInputVal("");
              }}
              autoFocus
            />
          </div>
        )}

        {explorerState?.nestedElms?.map((currElm) => {
          const { isFolder, id } = currElm;
          return (
            <div className="flex flex-col justify-center gap-2" key={id}>
              {isFolder ? (
                <FolderElement currElm={currElm} />
              ) : (
                <FileElement currElm={currElm} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarExtended;
