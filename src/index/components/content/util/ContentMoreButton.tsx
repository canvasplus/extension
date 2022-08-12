import {
  IoArrowBackOutline,
  IoEllipsisVertical,
  IoTrashBinOutline,
  IoTrashOutline,
} from "solid-icons/io";
import { children, createSignal, JSX, Signal } from "solid-js";

function ContentMoreButton(props: {
  tooltip: string;
  onClick: () => void;
  dragSignal: Signal<boolean>;
}) {
  const [showTooltip, setShowTooltip] = createSignal(false);

  let tooltipCallback;

  const [parentDrag, setParentDrag] = props.dragSignal;

  return (
    <div
      className="relative group"
      onMouseOver={() => {
        tooltipCallback = setTimeout(() => {
          setShowTooltip(true);
        }, 500);
      }}
      onMouseOut={() => {
        clearTimeout(tooltipCallback);

        setShowTooltip(false);
      }}
      onMouseDown={() => {
        clearTimeout(tooltipCallback);

        setShowTooltip(false);
      }}
    >
      <div
        className={`w-8 h-8 rounded-md flex flex-row justify-center items-center transition-colors cursor-pointer text-sm ${
          parentDrag()
            ? "bg-red-500 text-white stroke-white animate-slide-sm-right"
            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
        }`}
      >
        {parentDrag() ? <IoTrashOutline /> : <IoEllipsisVertical />}
      </div>
      <div
        className={`${
          showTooltip() && !parentDrag() ? "block" : "hidden"
        } absolute rounded-sm whitespace-nowrap text-sm px-1 top-9 left-1/2 -translate-x-1/2 bg-black/50 text-white`}
      >
        {props.tooltip}
      </div>
    </div>
  );
}

export default ContentMoreButton;
