/* eslint-disable @next/next/no-img-element */
import { useModal } from "@/hooks/use-modal";
import { formatPrice } from "@/lib/utils";
import { DashItemType } from "@/types";

const locationImages: { [key: string]: string } = {
  Df: "/assets/location-Df.webp",
  Da: "/assets/location-Da.webp",
  Dmf: "/assets/location-Dmf.webp",
  Dma: "/assets/location-Dma.webp",
  If: "/assets/location-If.webp",
  Ia: "/assets/location-Ia.webp",
  Imf: "/assets/location-Imf.webp",
  Ima: "/assets/location-Ima.webp",
  Chosu: "/assets/location-chosu.webp",
};

export default function DashItem({ item }: { item: DashItemType }) {
  const { onOpen } = useModal();
  const locationImage = item.location.name;

  return (
    <div className="flex flex-col p-2 shadow-lg rounded-md">
      <div className="flex justify-center items-center h-[200px]">
        <img
          src={item.imgUrls[0]}
          alt={`Item image from ${item.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="font-semibold line-clamp-1">{item.name}</p>
      <p>
        {formatPrice(item.price)} | {formatPrice(item.boughtAt)}
      </p>

      <p>{item.owner.name}</p>
      <img
        src={locationImages[locationImage]}
        alt={`Location image for ${item.location.name}`}
        className="w-[150px]"
      />
      <a
        className="flex px-2 py-1 mt-2 rounded-md items-center justify-center bg-dash_primary 
      text-dash_text hover:cursor-pointer"
        onClick={() => onOpen("editItem", { item })}
      >
        Editar
      </a>
    </div>
  );
}
