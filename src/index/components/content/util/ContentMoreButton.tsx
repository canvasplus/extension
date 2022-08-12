import { IoArrowBackOutline } from "solid-icons/io";
import { children, createSignal, JSX, Signal } from "solid-js";

function ContentMoreButton(props: {
  tooltip: string;
  onClick: () => void;
  children?: JSX.Element;
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
        className={`w-8 h-8 rounded-md bg-slate-100 flex flex-row justify-center items-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer text-sm`}
      >
        {props.children}
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
