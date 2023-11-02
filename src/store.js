import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "./features/customers/customerSlice";
import accountSlice from "./features/accounts/accountSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    customer: customerReducer,
  },
});

export default store;
