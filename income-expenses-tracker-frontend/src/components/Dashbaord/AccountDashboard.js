import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";


const AccountDashboard = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);
  console.log(profile);

  //dispatch action
  useEffect(() => {
    fetchProfileAction();
  }, []);
  console.log(profile?.user?.accounts);

  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong> {""}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <AccountSummary />
          <AccountList accounts={profile?.user?.accounts} />
        </>
      )}
    </>
  );
};

export default AccountDashboard;
