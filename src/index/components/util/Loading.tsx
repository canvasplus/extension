export default function Loading(props: { size?: number }) {
  const size = props.size ?? 20;

  return (
    <svg
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 84.03 84.03"
      width={`${size}px`}
      height={`${size}px`}
      className="animate-spin-slow"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0"
          y1="25.51"
          x2="84.03"
          y2="25.51"
          gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="var(--stop-color, gray)"
            stop-opacity="0"
          />
          <stop
            offset=".22"
            stop-color="var(--stop-color, gray)"
            stop-opacity=".32"
          />
          <stop
            offset=".45"
            stop-color="var(--stop-color, gray)"
            stop-opacity=".62"
          />
          <stop
            offset=".66"
            stop-color="var(--stop-color, gray)"
            stop-opacity=".83"
          />
          <stop
            offset=".85"
            stop-color="var(--stop-color, gray)"
            stop-opacity=".95"
          />
          <stop offset="1" stop-color="var(--stop-color, gray)" />
        </linearGradient>
      </defs>
      <path
        d="M75.03,42.02c0-18.23-14.78-33.02-33.02-33.02S9,23.78,9,42.02"
        style="fill:none; opacity:.5; stroke:url(#linear-gradient); stroke-linecap:round; stroke-linejoin:round; stroke-width:18px;"
      />
    </svg>
  );
}
