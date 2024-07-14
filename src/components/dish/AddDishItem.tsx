import { Spinner, X } from "@phosphor-icons/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export default function AddDishItem({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    dishName: "",
    dishId: "",
    imageUrl: "",
    isPublished: false,
  });
  const [dishUploaded, setIsDishuploaded] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsDishuploaded(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dishes`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      await response.json();
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDishuploaded(false);
    }
  };

  return (
    <div className="w-screen flex flex-col gap-3 items-center justify-center h-full backdrop-blur-md absolute right-0 top-0 z-[999] bg-white/10 transition-all">
      <div className="w-[548px] flex justify-end">
        <X
          onClick={() => setModalOpen(!modalOpen)}
          color="black"
          size={30}
          className="cursor-pointer"
        />
      </div>
      <div className="bg-white border-2 shadow-sm py-3 px-4 flex flex-col gap-4 rounded-lg">
        <h1 className="text-3xl text-slate-900 font-bold">
          Tell me about your favourite Dish
        </h1>
        <form className="flex flex-col gap-6">
          <div className="flex text-md flex-col text-black gap-[10px]">
            <label className="text-lg font-medium" htmlFor="name">
              Your dish name:{" "}
            </label>
            <input
              required
              className="text-slate-800 placeholder:text-slate-800 bg-transparent border-2 shadow-sm py-1 px-2 outline-none rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="eg. Kadhai Paneer"
              value={formData.dishName}
              onChange={(e) =>
                setFormData({ ...formData, dishName: e.target.value })
              }
            />
            <label className="text-lg font-medium" htmlFor="id">
              Your dish id:{" "}
            </label>
            <input
              required
              className="text-slate-800 placeholder:text-slate-800 bg-transparent border-2 shadow-sm py-1 px-2 outline-none rounded-md"
              type="text"
              name="id"
              id="id"
              placeholder="Any number..."
              value={formData.dishId}
              onChange={(e) =>
                setFormData({ ...formData, dishId: e.target.value })
              }
            />
            <label className="text-lg font-medium" htmlFor="url">
              Your dish&apos;s url:{" "}
            </label>
            <input
              required
              className="text-slate-800 placeholder:text-slate-800 bg-transparent border-2 shadow-sm py-1 px-2 outline-none rounded-md tracking-wide"
              type="text"
              name="url"
              id="url"
              placeholder="eg. https://any-image-abc.com"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
            <legend className="text-lg font-medium">
              Is your dish published?
            </legend>
            <div className="flex gap-3">
              <div className="flex gap-1">
                <input
                  required
                  type="radio"
                  id="isPublishedTrue"
                  name="isPublishedTrue"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: true })
                  }
                />
                <label htmlFor="isPublishedTrue">True</label>
              </div>

              <div className="flex gap-1">
                <input
                  type="radio"
                  id="isPublishedFalse"
                  name="isPublishedFalse"
                  checked={!formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: false })
                  }
                />
                <label htmlFor="isPublishedFalse">False</label>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={handleFormSubmit}
              className="shadow-sm border-2 px-2 py-1 text-lg rounded-md font-medium text-white bg-gray-700 hover:bg-slate-800"
              type="submit"
            >
              {dishUploaded ? (
                <div className="flex items-center gap-2">
                  <Spinner size={24} className="animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
