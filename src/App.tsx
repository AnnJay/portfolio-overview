import { useEffect } from "react";

import { useAppDispatch } from "./hooks/redux";
import { MainPage } from "./pages/MainPage";
import { fetchAllCurrency } from "./store/reducers/asyncActions";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCurrency());
  }, []);

  return (
    <div className="app-container">
      <MainPage />
    </div>
  );
};
