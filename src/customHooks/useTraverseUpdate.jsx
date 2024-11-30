const useTraverseUpdate = () => {
  const updateNode = (tree, idToUpdate, newElmName) => {
    return tree.map((item) => {
      if (item.id === idToUpdate) {
        return { ...item, elmName: newElmName };
      }
      if (item.nestedElms && item.nestedElms.length > 0) {
        return {
          ...item,
          nestedElms: updateNode(item.nestedElms, idToUpdate, newElmName),
        };
      }
      return item; 
    });
  };
  return { updateNode };
};

export default useTraverseUpdate;
