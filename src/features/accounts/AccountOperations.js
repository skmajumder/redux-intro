import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { diposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const { loan: currentLoan, loanPurpose: currentLoanPurpose } = useSelector(
    (store) => store.account
  );

  const handleDeposit = () => {
    if (!depositAmount) return;
    dispatch(diposit(depositAmount));

    setDepositAmount("");
  };

  const handleWithdrawal = () => {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));

    setWithdrawalAmount("");
  };

  const handleRequestLoan = () => {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));

    setLoanAmount("");
    setLoanPurpose("");
  };

  const handlePayLoan = () => {
    dispatch(payLoan());
  };

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>Withdraw</button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan ? (
          <>
            <div>
              <span>
                Pay back ${currentLoan} ({currentLoanPurpose})
              </span>
              <button onClick={handlePayLoan}>Pay loan</button>
            </div>
          </>
        ) : (
          <>
            <div>
              <span>*You don't have any loan yet</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
