import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CurrencyShortInterface } from "../../types/currency.type";
import { fixLastPrice } from "../../libs/utils";

import "./form.style.scss";
import { userCurrencySlice } from "../../store/reducers/userCurrencySlice";

interface AddCurrencyFormProps {
  onCancel: () => void;
}

export const AddCurrencyForm: FC<AddCurrencyFormProps> = ({ onCancel }) => {
  const { allCurrency, allCurrencyKeys } = useAppSelector(
    (state) => state.allCurrency
  );

  const { addNewCurrency, refreshTableStatistics } = userCurrencySlice.actions;
  const dispatch = useAppDispatch();

  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyShortInterface | null>(null);

  const [searchValue, setSearchValue] = useState<string>("");

  const [listInnerValues, setListInnerValues] =
    useState<string[]>(allCurrencyKeys);

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setListInnerValues(
      allCurrencyKeys.filter((key) => key.includes(searchValue.toLowerCase()))
    );
  }, [searchValue]);

  const handleSelectCurrency = (currency: CurrencyShortInterface) =>
    setSelectedCurrency(currency);

  const handleAddCurrency = () => {
    if (selectedCurrency) {
      const newUserCurrency = { ...selectedCurrency, count };
      dispatch(addNewCurrency(newUserCurrency));
      dispatch(refreshTableStatistics());
      onCancel();
    }
  };

  return (
    <div>
      <div className="input__container width-100">
        <input
          className="width-100"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Введите название"
        />
      </div>

      <ul className="currency__list width-100">
        {listInnerValues.map((key) => (
          <li
            key={key}
            className="currency__list-item"
            onClick={() => handleSelectCurrency(allCurrency[key])}
          >
            <div className="col-width-xl">{allCurrency[key].name}</div>
            <div className="col-width-xxl">
              {fixLastPrice(allCurrency[key].lastPrice)}
            </div>
            <div className="col-width-xl">
              {allCurrency[key].priceChangePercent}
            </div>
          </li>
        ))}
      </ul>

      {selectedCurrency && (
        <div>
          <div className="selected-item__container">
            <div className="w-25">{selectedCurrency.name.toUpperCase()}</div>
            <div className="w-25">
              {fixLastPrice(selectedCurrency.lastPrice)}
            </div>
          </div>

          <div className="bottom__container">
            <div className="input__container col-width-xl">
              <input
                className="width-100"
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                placeholder="Введите количество"
                min={0}
              />
            </div>
            <button
              className="button button-primary col-width-xl"
              onClick={handleAddCurrency}
            >
              Добавить
            </button>
            <button
              className="button button-primary col-width-xl"
              onClick={onCancel}
            >
              Отменить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
