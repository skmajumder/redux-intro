import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return { ...state, loan: 0, loanPurpose: "" };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 2000 });
store.dispatch({ type: "account/withdraw", payload: 500 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Business investment" },
});

console.log(store.getState());
