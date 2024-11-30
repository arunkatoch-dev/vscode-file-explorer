import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  const uniqueId = uuidv4();
  const insertNode = (tree, folderId, elmName, isFolder) => {
    const treeCopy = [...tree];
    treeCopy?.map((currElm) => {
      if (currElm?.isFolder && currElm?.id === folderId) {
        isFolder
          ? currElm?.nestedElms?.unshift({
              id: uniqueId,
              isFolder: true,
              elmName,
              nestedElms: [],
            })
          : currElm?.nestedElms?.push({
              id: uniqueId,
              isFolder: false,
              elmName,
            });
        return treeCopy;
      }

      const nestTraverse = (nestedElm, folderId, elmName, isFolder) => {
        if (nestedElm?.isFolder && nestedElm?.id === folderId) {
          isFolder
            ? nestedElm?.nestedElms?.unshift({
                id: uniqueId,
                isFolder: true,
                elmName,
                nestedElms: [],
              })
            : nestedElm?.nestedElms?.push({
                id: uniqueId,
                isFolder: false,
                elmName,
              });
          return treeCopy;
        }
        nestedElm?.nestedElms?.map((currElm) => {
          return nestTraverse(currElm, folderId, elmName, isFolder);
        });
        return treeCopy;
      };

      currElm?.nestedElms?.map((currElm) => {
        return nestTraverse(currElm, folderId, elmName, isFolder);
      });
      return treeCopy;
    });
    return treeCopy;
  };
  return { insertNode };
};

export default useTraverseTree;
