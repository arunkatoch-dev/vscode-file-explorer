const useTraverseDelete = () => {
  const deleteNode = (tree, idToDelete) => {
    return tree.filter((item) => {
      if (item.nestedElms && item.nestedElms.length > 0) {
        item.nestedElms = deleteNode(item.nestedElms, idToDelete);
      }
      return item.id !== idToDelete;
    });
  };
  return { deleteNode };
};

export default useTraverseDelete;
