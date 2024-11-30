import { memo, useState } from "react";
import { FaFile } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useTraverseDelete from "../customHooks/useTraverseDelete";
import { useMainContext } from "../customHooks/useMainAppContext";
import useTraverseUpdate from "../customHooks/useTraverseUpdate";
const FileElement = ({ currElm }) => {
  const { elmName, id } = currElm;
  const { deleteNode } = useTraverseDelete();
  const appContext = useMainContext();
  const { updateNode } = useTraverseUpdate();
  const { explorerState } = appContext?.appState;
  const { dispatch } = appContext;
  const [isEditing, setIsEditing] = useState(false);
  const [elementValue, setElementValue] = useState(elmName);

  const handleUpdateNode = (id, elementValue) => {
    const updatedTree = updateNode(explorerState?.nestedElms, id, elementValue);
    dispatch({ type: "INSERT_ON_NESTED_FOLDER", insertedItem: updatedTree });
  };
  const handleDeleteNode = (id) => {
    const deletedTree = deleteNode(explorerState?.nestedElms, id);
    dispatch({ type: "INSERT_ON_NESTED_FOLDER", insertedItem: deletedTree });
  };
  const onUpdateHandler = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Exit edit mode
      handleUpdateNode(id, elementValue);
    }
  };
  const onDoubleClickHandler = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const onDeleteHandler = () => {
    handleDeleteNode(id);
  };

  return (
    <div className="flex items-center justify-between px-4 gap-3 hover:bg-neutral-700">
      <div className="flex gap-3 px-1 items-center">
        <FaFile className="text-lg text-gray-400" />

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
                setIsEditing(false);
                setElementValue(elmName);
              }}
              autoFocus
            />
          ) : (
            <span
              className="text-lg text-gray-500"
              onDoubleClick={onDoubleClickHandler}
            >
              {elementValue}
            </span>
          )}
        </div>
      </div>
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
  );
};

export default memo(FileElement);
