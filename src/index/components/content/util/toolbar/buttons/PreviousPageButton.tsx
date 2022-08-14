import { FiArrowLeft } from "solid-icons/fi";
import { IoArrowBackOutline, IoDocumentOutline } from "solid-icons/io";
import { Accessor, children, createSignal, JSX, Signal } from "solid-js";
import Dialogue from "../../../../interactive/containers/Dialogue";
import { ContentToolbarButtonProps } from "../ContentMetaToolbar";

function PreviousPageButton(props: ContentToolbarButtonProps) {
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
        className={`w-8 h-8 rounded-md flex flex-row justify-center items-center bg-light-sys-btn-bg dark:bg-dark-sys-btn-bg hover:bg-light-sys-btn-bg-hov dark:hover:bg-dark-sys-btn-bg-hov text-light-sys-btn-text dark:text-dark-sys-btn-text transition-colors cursor-pointer text-sm${
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
          tooltipCallback = undefined;

          clearTimeout(dragCallback);
          dragCallback = undefined;
        }}
        onMouseDown={(e2) => {
          if (e2.button !== 0) return;

          setX(e2.clientX);
          setY(e2.clientY);

          clearTimeout(tooltipCallback);
          tooltipCallback = undefined;

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
              setRemoving(false);
            }
          };

          window.addEventListener("mousemove", moveListener);

          dragCallback = setTimeout(() => {
            dragCallback = undefined;
            setMyDrag(true);
            setParentDrag(true);
            window.addEventListener("mouseup", mouseUpCallback);
          }, 500);
        }}
        onMouseUp={(e) => {
          if (e.button !== 0) return;

          clearTimeout(dragCallback);
          dragCallback = undefined;
        }}
      >
        <FiArrowLeft />
      </div>
      <div
        className={`absolute rounded-sm whitespace-nowrap text-sm px-1 top-10 right-0 z-10`}
      >
        <Dialogue large={true}>
          <div className="bg-light-sys-btn-bg dark:bg-dark-sys-btn-bg text-light-sys-btn-text dark:text-dark-sys-btn-text py-1 px-3 border-b border-light-sys-border dark:border-dark-sys-border">
            <p>Previous Page</p>
          </div>
          <div className="py-2 px-3 items-center flex flex-row gap-3 text-light-sys-par dark:text-dark-sys-par">
            <div className="text-light-sys-icon dark:text-dark-sys-icon">
              <IoDocumentOutline />
            </div>
            <p>Page Name</p>
          </div>
        </Dialogue>
      </div>
    </div>
  );
}

export default PreviousPageButton;
