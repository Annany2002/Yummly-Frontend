import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import AddDishItem from "./AddDishItem";

export default function AddDishItemButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full flex justify-end px-8">
      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="flex gap-1 shadow-sm items-center justify-evenly border-2 px-2 py-1 rounded-md font-medium dark:bg-[#040D12] bg-white hover:bg-slate-100"
      >
        <PlusCircle size={20} />
        Add an Item
      </button>
      {modalOpen && (
        <AddDishItem modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
