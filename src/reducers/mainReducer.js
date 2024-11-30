export const mainReducer = (state, action) => {
  switch (action.type) {
    case "toggleExtendedSideBar":
      if (!state.extendedSideBarWindow) {
        return {
          ...state,
          extendedSideBarWindow: true,
        };
      } else {
        return {
          ...state,
          extendedSideBarWindow: false,
        };
      }
    case "INSERT_ON_ROOT":
      return {
        ...state,
        explorerState: {
          ...state.explorerState,
          nestedElms: [...state.explorerState.nestedElms, action.insertedItem],
        },
      };
    case "INSERT_ON_NESTED_FOLDER":
      return {
        ...state,
        explorerState: {
          ...state.explorerState,
          nestedElms: action.insertedItem,
        },
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
