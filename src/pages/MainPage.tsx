import { useState } from "react";

import { Table } from "../components/Table/Table";
import { SimpleModal } from "../components/SimpleModal/SimpleModal";
import { PulseButton } from "../components/PulseButton/PulseButton";
import { AddCurrencyForm } from "../components/AddCurrencyForm/AddCurrencyForm";

export const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Table />
      <SimpleModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        children={<AddCurrencyForm onCancel={() => setIsModalOpen(false)} />}
      />

      <PulseButton onClick={() => setIsModalOpen(true)} />
    </div>
  );
};
