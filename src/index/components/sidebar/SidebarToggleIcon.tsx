import { IoCaretForward, IoHomeOutline } from "solid-icons/io";
import { Accessor } from "solid-js";

export default function SidebarToggleIcon(props: {
  type: "DEFAULT" | "HOME";
  expanded: Accessor<boolean>;
}) {
  const smallArrow = () => {
    return (
      <span
        className={`absolute block text-xs -bottom-1 -right-1 transition-transform ${
          props.expanded() ? "rotate-90" : "rotate-0"
        }`}
      >
        <svg
          width="12.5"
          height="12.5"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M386.77 304.483C393.78 298.463 399.4 291.013 403.26 282.633C407.12 274.243 409.11 265.123 409.11 255.893C409.11 246.663 407.11 237.543 403.26 229.153C399.4 220.763 393.78 213.313 386.77 207.303L223.65 67.5232C182.15 31.9632 118 61.4232 118 116.113V395.713C118 450.383 182.13 479.883 223.65 444.263C223.65 444.263 223.67 444.233 223.69 444.223L386.77 304.483V304.483Z"
            className="fill-cyan-700"
          />
          <path
            d="M182.29 499.93C167.56 499.93 152.69 496.75 138.56 490.25C101.2 473.08 78 436.88 78 395.77V116.17C78 75.0696 101.19 38.8696 138.53 21.6996C175.05 4.8896 216.6 10.2096 247.61 35.4796L247.84 35.6296L412.82 177C424.13 186.7 433.39 198.97 439.61 212.5C445.92 226.22 449.12 240.84 449.12 255.95C449.12 271.06 445.83 285.87 439.61 299.4C433.39 312.92 424.13 325.2 412.82 334.9L412.08 335.53L250.58 473.92L250.09 474.39L249.16 475.14C229.86 491.48 206.27 499.93 182.29 499.93V499.93ZM182.38 92.0496C177.82 92.0496 174.06 93.4096 171.96 94.3696C167.76 96.2996 158 102.29 158 116.17V395.77C158 409.65 167.77 415.63 171.97 417.56C176.04 419.43 186.44 422.8 196.68 414.73L196.94 414.47L198.14 413.51L360.86 274.07C363.42 271.85 365.52 269.05 366.94 265.97C368.4 262.8 369.14 259.43 369.14 255.94C369.14 252.45 368.4 249.08 366.95 245.91C365.53 242.83 363.43 240.03 360.87 237.8L360.77 237.71L197.62 97.9496C192.34 93.4196 186.96 92.0496 182.38 92.0496V92.0496Z"
            className="fill-cyan-50"
          />
        </svg>
      </span>
    );
  };

  if (props.type === "DEFAULT") {
    return (
      <div
        className={`transition-transform flex justify-center items-center w-4 h-4 relative ${
          props.expanded() ? "rotate-90" : "rotate-0"
        }`}
      >
        <IoCaretForward className="text-sm" />
      </div>
    );
  } else if (props.type === "HOME") {
    return (
      <div className={`relative flex justify-center items-center w-4 h-4`}>
        <IoHomeOutline className="text-base" />
        {smallArrow()}
      </div>
    );
  }
}
