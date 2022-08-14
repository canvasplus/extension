import {
  IoArrowBackOutline,
  IoEllipsisVertical,
  IoTrashBinOutline,
  IoTrashOutline,
} from "solid-icons/io";
import { children, createSignal, JSX, Setter, Signal } from "solid-js";

function ContentMoreButton(props: {
  tooltip: string;
  onClick: () => void;
  dragSignal: Signal<boolean>;
  setRemoving: Setter<boolean>;
}) {
  const [showTooltip, setShowTooltip] = createSignal(false);

  let tooltipCallback;

  const [parentDrag, setParentDrag] = props.dragSignal;

  return (
    <div
      className={`relative group z-10 w-8 h-8${
        parentDrag() ? " cursor-grab" : " cursor-pointer"
      }`}
      onMouseOver={() => {
        if (parentDrag()) {
          props.setRemoving(true);
        }

        tooltipCallback = setTimeout(() => {
          setShowTooltip(true);
        }, 500);
      }}
      onMouseOut={() => {
        props.setRemoving(false);

        clearTimeout(tooltipCallback);

        setShowTooltip(false);
      }}
      onMouseDown={() => {
        clearTimeout(tooltipCallback);

        setShowTooltip(false);
      }}
    >
      <div
        className={`relative z-10 w-8 h-8 rounded-md flex flex-row justify-center items-center transition-colors text-sm ${
          parentDrag()
            ? "bg-red-500 text-white stroke-white animate-slide-sm-right"
            : "bg-light-sys-btn-bg group-hover:bg-light-sys-btn-bg-hov text-light-sys-btn-text dark:bg-dark-sys-btn-bg dark:group-hover:bg-dark-sys-btn-bg-hov dark:text-dark-sys-btn-text"
        }`}
      >
        {parentDrag() ? <IoTrashOutline /> : <IoEllipsisVertical />}
      </div>
      <div
        className={`absolute z-50 h-8 w-8 top-0 bg-transparent rounded-md scale-150`}
      />
      <div
        className={`absolute h-8 w-8 top-0 bg-red-500/50 rounded-md scale-0 ${
          parentDrag() && "group-hover:scale-150"
        }`}
      />
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
