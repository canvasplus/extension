import {
  IoArrowRedo,
  IoArrowRedoOutline,
  IoCaretForward,
  IoDocument,
  IoDocumentOutline,
  IoExtensionPuzzleOutline,
} from "solid-icons/io";
import { Accessor } from "solid-js";

export default function SidebarRedirectIcon(props: {
  type: "DEFAULT" | "EXTERNAL" | "PAGE";
}) {
  const smallArrow = () => {
    return (
      <span className="absolute block text-xs -bottom-0.5 -right-0.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 423.998C35.9993 429.828 37.8183 435.513 41.2033 440.26C42.7836 442.476 44.6685 444.435 46.79 446.089V447.709L54.8826 450.496C60.3956 452.395 66.3638 452.525 71.9543 450.868C77.5448 449.212 82.4788 445.851 86.0676 441.256L86.0699 441.253C108.63 412.348 128.543 391.434 155.44 377.53C177.952 365.896 206.287 358.974 244 356.768V424V424.001C244 429.484 245.611 434.846 248.631 439.422C251.651 443.998 255.948 447.586 260.989 449.743C266.03 451.899 271.593 452.527 276.988 451.551C282.383 450.574 287.372 448.035 291.337 444.249L467.336 276.25L467.339 276.248C470.076 273.633 472.254 270.491 473.743 267.011C475.231 263.531 475.999 259.785 475.999 256C475.999 252.215 475.231 248.469 473.743 244.989C472.254 241.509 470.076 238.367 467.339 235.752L467.336 235.75L291.337 67.7514C287.372 63.9649 282.383 61.4259 276.988 60.4492C271.593 59.4726 266.03 60.1013 260.989 62.2575C255.948 64.4136 251.651 68.0023 248.631 72.5783C245.611 77.1543 244 82.5162 244 87.9989V88V157.096C172.536 162.867 117.441 191.441 81.7558 243.44C50.9419 288.337 36 349.47 36 423.998ZM36 423.998L48 424L36 423.998Z"
            className={
              "stroke-cyan-50 group-hover:stroke-cyan-200 fill-gray group-hover:fill-cyan-700"
            }
            stroke-width="80"
          />
        </svg>
      </span>
    );
  };

  if (props.type === "DEFAULT") {
    return (
      <div className="block w-4 h-4">
        <IoArrowRedo className="text-sm" />
      </div>
    );
  } else if (props.type === "EXTERNAL") {
    return (
      <div className="block w-4 h-4">
        <IoExtensionPuzzleOutline className="text-base" />
      </div>
    );
  } else if (props.type === "PAGE") {
    return (
      <div className="block w-4 h-4">
        <IoDocumentOutline className="text-base" />
      </div>
    );
  }
}
