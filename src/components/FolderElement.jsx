import { memo, useState } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdFolder,
  MdKeyboardArrowDown,
  MdDelete,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaFolderOpen, FaFile } from "react-icons/fa6";
import FileElement from "./FileElement";
import { useMainContext } from "../customHooks/useMainAppContext";
import useTraverseTree from "../customHooks/useTraverseTree";
import useTraverseDelete from "../customHooks/useTraverseDelete";
import useTraverseUpdate from "../customHooks/useTraverseUpdate";

const FolderElement = ({ currElm }) => {
  const { elmName, nestedElms, id } = currElm;
  const appContext = useMainContext();
  const { explorerState } = appContext?.appState;
  const { dispatch } = appContext;
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [displayInput, setDisplayInput] = useState(false);
  const [isFolder, setIsFolder] = useState(true);
  const { insertNode } = useTraverseTree();
  const { deleteNode } = useTraverseDelete();
  const { updateNode } = useTraverseUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [elementValue, setElementValue] = useState(elmName);

  const handleInsertNode = (id, elementName, isFolder) => {
    const finalTree = insertNode(
      explorerState?.nestedElms,
      id,
      elementName,
      isFolder
    );
    dispatch({
      type: "INSERT_ON_NESTED_FOLDER",
      insertedItem: finalTree,
    });
  };
  const handleDeleteNode = (id) => {
    const deletedTree = deleteNode(explorerState?.nestedElms, id);
    dispatch({ type: "INSERT_ON_NESTED_FOLDER", insertedItem: deletedTree });
  };
  const handleUpdateNode = (id, elementValue) => {
    const updatedTree = updateNode(explorerState?.nestedElms, id, elementValue);
    dispatch({ type: "INSERT_ON_NESTED_FOLDER", insertedItem: updatedTree });
  };

  const onDeleteHandler = () => {
    handleDeleteNode(id);
  };
  const toggleFolder = (e) => {
    e.preventDefault();
    setIsOpen((open) => !open);
  };

  const onAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setInputVal("");
      setIsOpen(true);
      handleInsertNode(id, inputVal, isFolder);
      setDisplayInput(false);
    }
  };
  const onUpdateHandler = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Exit edit mode
      handleUpdateNode(id, elementValue);
    }
  };
  const onAddNew = () => {
    setIsOpen(true);
    setDisplayInput(true);
  };

  const onDoubleClickHandler = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 p-2 hover:bg-neutral-700">
        {isOpen ? (
          <MdKeyboardArrowDown
            className="text-2xl text-white hover:cursor-pointer"
            onClick={toggleFolder}
          />
        ) : (
          <MdOutlineKeyboardArrowRight
            className="text-2xl text-white hover:cursor-pointer"
            onClick={toggleFolder}
          />
        )}

        <div className="flex items-center gap-2 hover:cursor-pointer">
          {isOpen ? (
            <FaFolderOpen
              className="text-lg text-gray-400"
              onClick={toggleFolder}
            />
          ) : (
            <MdFolder
              className="text-lg text-gray-400"
              onClick={toggleFolder}
            />
          )}
        </div>

        <div>
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent text-white border-none"
              value={elementValue}
              onChange={(e) => {
                setElementValue(e.target.value);
              }}
              onKeyDown={onUpdateHandler}
              onBlur={() => {
                setIsEditing(false); // Exit edit mode if the user clicks away
                setElementValue(elmName);
              }}
              autoFocus
            />
          ) : (
            <span
              className="text-base text-gray-500"
              onDoubleClick={onDoubleClickHandler}
            >
              {elementValue}
            </span>
          )}
        </div>
        <div className="flex items-center mx-auto gap-3 ">
          <FaPlus
            title="add folder/file"
            className="text-white hover:text-white/50 text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onAddNew();
            }}
          />
          <MdDelete
            className="text-white hover:text-white/50 text-sm cursor-pointer"
            onClick={() => {
              const userConfirm = confirm("Are you sure to delete");
              if (userConfirm) {
                onDeleteHandler();
              }
            }}
          />
        </div>
      </div>

      {displayInput && (
        <div className="w-full flex items-center justify-center gap-3">
          {isFolder ? (
            <MdFolder className="text-lg text-gray-400" />
          ) : (
            <FaFile className="text-lg text-gray-400" />
          )}
          <input
            type="text"
            title="you can add file by giving extension e.g index.html"
            className="bg-transparent border border-gray-300 outline-none text-white px-2 w-[60%]"
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
      {isOpen &&
        nestedElms?.map((currElm) => {
          const { id, isFolder } = currElm;
          return (
            <div className="flex flex-col pl-2" key={id}>
              {isFolder ? (
                <FolderElement currElm={currElm} />
              ) : (
                <FileElement currElm={currElm} />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default memo(FolderElement);
