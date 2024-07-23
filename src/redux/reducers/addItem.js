const addItem = [];

const addItems = (state = addItem, action) => {
  if (action.type === "ADDITEM") {
    const existingItem = state.find((x) => x.id === action.payload.id);
    if (existingItem) {
      // If the item already exists in the cart, increase its quantity
      return state.map((x) => {
        if (x.id === action.payload.id) {
          return { ...x, quantity: x.quantity + 1 };
        }
        return x;
      });
    } else {
      // If the item doesn't exist in the cart, add it
      return [...state, { ...action.payload, quantity: 1 }];
    }
  } else if (action.type === "DELITEM") {
    return state.filter((x) => x.id !== action.payload.id);
  } else if (action.type === "DELETEMORE") {
    const existdelete = state.filter((x) => x.id === action.payload.id);
    if (existdelete) {
      return state.map((x) => {
        if (x.id === action.payload.id) {
          return { ...x, quantity: x.quantity - 1 };
        }
        return x;
      });
    }
  } else {
    return state;
  }
};

export default addItems;
