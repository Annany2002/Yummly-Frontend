import Image from "next/image";
import { useState } from "react";
import { Spinner } from "@phosphor-icons/react";

export interface Dish {
  dishName: string;
  dishId: string;
  imageUrl: string;
  isPublished: boolean;
}

export default function DishCard({ dish }: { dish: Dish }) {
  const [toggleState, setToggleState] = useState<boolean>(dish.isPublished);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const togglePublishedState = async () => {
    setIsLoading(true);
    try {
      const reponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dishes/update/${dish.dishId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ isPublished: !toggleState }),
        }
      );
      const newState = await reponse.json();
      setToggleState(newState.isPublished);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[240px] bg-gray-100 dark:bg-[#0F0F0F] rounded-xl h-[240px] flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-500 border-2 shadow-sm">
      <Image
        height="100"
        width="100"
        src={dish.imageUrl}
        alt="dishImage"
        className="rounded-xl border"
      />
      <p className="text-xl font-medium">{dish.dishName}</p>
      <p className="text-sm">
        Status :{" "}
        <span className="font-bold text-gray-600 dark:text-gray-500">
          {toggleState === true ? "Published" : "Not Published"}
        </span>
      </p>
      <button
        onClick={togglePublishedState}
        className="px-2 border py-1.5 shadow-md dark:bg-[#040D12] bg-white rounded-lg"
      >
        {isLoading ? (
          <Spinner size={24} className="animate-spin" />
        ) : (
          "Toggle Status"
        )}
      </button>
    </div>
  );
}
