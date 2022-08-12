import { IoArrowBackOutline } from "solid-icons/io";
import { Accessor, children, createSignal, JSX, Signal } from "solid-js";

function ContentTopButton(props: {
  tooltip: string;
  onClick: () => void;
  children?: JSX.Element;
  dragSignal: Signal<boolean>;
  removingSignal: Signal<boolean>;
}) {
  const [showTooltip, setShowTooltip] = createSignal(false);

  let tooltipCallback;
  let dragCallback;
  let mouseUpCallback;
  let moveListener;

  const [myDrag, setMyDrag] = createSignal(false);
  const [parentDrag, setParentDrag] = props.dragSignal;

  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);

  const [removing, setRemoving] = props.removingSignal;

  return (
    <div
      className={`group ${
        myDrag() ? "fixed -translate-x-1/2 -translate-y-1/2" : "relative"
      }`}
      style={{
        top: myDrag() ? `${y()}px` : "",
        left: myDrag() ? `${x()}px` : "",
      }}
    >
      <div
        className={`w-8 h-8 rounded-md flex flex-row justify-center items-center bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer text-sm${
          myDrag() ? " scale-90" : ""
        }${!parentDrag() || myDrag() ? "" : " opacity-50"} ${
          showTooltip() && !parentDrag()
            ? "next:hidden next:hover:block"
            : "next:hidden"
        }`}
        onMouseOver={() => {
          tooltipCallback = setTimeout(() => {
            setShowTooltip(true);
          }, 500);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
          clearTimeout(tooltipCallback);

          clearTimeout(dragCallback);

          // if (myDrag()) {
          //   window.removeEventListener("mousemove", moveListener);
          //   setMyDrag(false);
          //   setParentDrag(false);
          // }
        }}
        onMouseDown={(e2) => {
          setX(e2.clientX);
          setY(e2.clientY);

          clearTimeout(tooltipCallback);

          setShowTooltip(false);

          moveListener = (e) => {
            setX(e.clientX);
            setY(e.clientY);
          };

          mouseUpCallback = () => {
            window.removeEventListener("mousemove", moveListener);
            window.removeEventListener("mouseup", mouseUpCallback);
            setMyDrag(false);
            setParentDrag(false);

            if (removing()) {
              console.log("removing myself!");
              setRemoving(false);
            }
          };

          window.addEventListener("mousemove", moveListener);

          dragCallback = setTimeout(() => {
            setMyDrag(true);
            setParentDrag(true);
            window.addEventListener("mouseup", mouseUpCallback);
          }, 500);
        }}
        onMouseUp={() => {
          clearTimeout(dragCallback);
        }}
      >
        {props.children}
      </div>
      <div
        className={`absolute rounded-sm whitespace-nowrap text-sm px-1 top-9 left-1/2 -translate-x-1/2 bg-black/50 text-white`}
      >
        {props.tooltip}
      </div>
    </div>
  );
}

export default ContentTopButton;
