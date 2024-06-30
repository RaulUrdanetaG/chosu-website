/* eslint-disable @next/next/no-img-element */
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  Image as ImageIcon,
  X,
} from "lucide-react";

export default function Images({
  imagePreviews,
  handleImageUpload,
  removeImages,
  shift,
}: {
  imagePreviews: string[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImages: (index: number) => void;
  shift: {
    right: () => void;
    left: () => void;
  };
}) {
  return (
    <div className="flex flex-col gap-1">
      {imagePreviews.length > 0 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              shift.left();
            }}
          >
            <ChevronLeftCircle />
          </button>
          <RenderImagePreviews
            imagePreviews={imagePreviews}
            removeImages={removeImages}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              shift.right();
            }}
          >
            <ChevronRightCircle />
          </button>
        </div>
      )}
      <div className="flex justify-center">
        <label
          htmlFor="img-input"
          className="flex justify-center text-xs items-center bg-dash_primary text-dash_text rounded-lg 
          px-2 py-1 self-center hover:cursor-pointer hover:bg-opacity-80"
        >
          <ImageIcon className="w-4 h-4 mr-2" /> <p>Subir imagenes</p>
        </label>
        <input
          hidden
          type="file"
          id="img-input"
          onChange={handleImageUpload}
          accept="image/*"
          required
          multiple
        />
      </div>
    </div>
  );
}

function RenderImagePreviews({
  imagePreviews,
  removeImages,
}: {
  imagePreviews: string[];
  removeImages: (index: number) => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-1 w-[200px]">
      <div className="relative">
        <div
          className="absolute -top-1 -right-1 bg-red-500 p-[2px] rounded-full hover:cursor-pointer"
          onClick={() => removeImages(0)}
        >
          <X className=" rounded-full w-2 h-2" />
        </div>
        <img
          src={imagePreviews[0]}
          alt="Preview 0"
          className="w-20 h-20 rounded-sm"
        />
      </div>
      <div className="flex gap-1 overflow-x-auto p-2 w-[200px]">
        {imagePreviews.map(
          (url, index) =>
            index !== 0 && (
              <div className="relative w-10 h-10" key={index}>
                <div
                  className="absolute -top-1 -right-1 bg-red-500 p-[2px] rounded-full hover:cursor-pointer"
                  onClick={() => removeImages(index)}
                >
                  <X className=" rounded-full w-2 h-2" />
                </div>
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-sm"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
