import { FiArrowLeft, FiArrowRight } from "solid-icons/fi";
import { IoArrowBackOutline, IoDocumentOutline } from "solid-icons/io";
import { Accessor, children, createSignal, JSX, Signal } from "solid-js";
import { useLocation } from "../../../../../lib/context/location";
import { useAdjacdentPages } from "../../../../../lib/context/adjacentPages";
import Dialogue from "../../../../interactive/containers/Dialogue";
import VLink from "../../../../util/VLink";
import { ContentToolbarButtonProps } from "../ContentMetaToolbar";

function NextPageButton(props: ContentToolbarButtonProps) {
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

  const [{}, nextPage] = useAdjacdentPages();

  const disabled = !nextPage || !nextPage.href;

  const [{}, { goTo }] = useLocation();

  return (
    <VLink href={nextPage?.href}>
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
          className={`w-8 h-8 rounded-md flex flex-row justify-center items-center bg-light-sys-btn-bg dark:bg-dark-sys-btn-bg text-light-sys-btn-text dark:text-dark-sys-btn-text transition-colors text-sm${
            myDrag() ? " scale-90" : ""
          }${
            (!parentDrag() || myDrag()) && !disabled
              ? " cursor-pointer hover:bg-light-sys-btn-bg-hov dark:hover:bg-dark-sys-btn-bg-hov"
              : " opacity-50"
          } ${
            showTooltip() && !parentDrag() && !disabled
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

            if ((dragCallback == null || !myDrag()) && !disabled) {
              goTo(nextPage?.href);
            }

            clearTimeout(dragCallback);
            dragCallback = undefined;
          }}
        >
          <FiArrowRight />
        </div>
        <div
          className={`absolute rounded-sm whitespace-nowrap text-sm px-1 top-10 right-0 z-10`}
        >
          <Dialogue large={true}>
            <div className="bg-light-sys-btn-bg dark:bg-dark-sys-btn-bg text-light-sys-btn-text dark:text-dark-sys-btn-text py-1 px-3 border-b border-light-sys-border dark:border-dark-sys-border">
              <p>Next Page</p>
            </div>
            <div className="py-2 px-3 items-center flex flex-row gap-3 text-light-sys-par dark:text-dark-sys-par overflow-ellipsis overflow-hidden">
              <div className="text-light-sys-icon dark:text-dark-sys-icon">
                {nextPage?.icon}
              </div>
              <p>{nextPage?.label ?? "Unknown Page"}</p>
            </div>
          </Dialogue>
        </div>
      </div>
    </VLink>
  );
}

export default NextPageButton;
