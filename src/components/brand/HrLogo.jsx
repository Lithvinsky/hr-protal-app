import { useId } from "react";

/**
 * HR Portal brand mark — team + hub motif. Use variant="onPrimary" on blue navbar.
 */
function HrLogo({ size = 48, variant = "default", className = "" }) {
  const onPrimary = variant === "onPrimary";
  const idBase = useId().replace(/:/g, "");
  const gradId = `hrLogoGrad-${idBase}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={`hr-logo ${className}`.trim()}
      role="img"
      aria-label="HR Portal"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          {onPrimary ? (
            <>
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(230,242,255,0.85)" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#6ea8fe" />
              <stop offset="100%" stopColor="#0d6efd" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="13"
        fill={onPrimary ? "rgba(255,255,255,0.2)" : `url(#${gradId})`}
        stroke={onPrimary ? "rgba(255,255,255,0.45)" : "rgba(13,110,253,0.12)"}
        strokeWidth="1"
      />
      <g fill="#ffffff">
        <circle cx="17.5" cy="19" r="4.2" />
        <circle cx="30.5" cy="19" r="4.2" />
        <path d="M12.5 33.5c0-4.8 4.2-8.5 11.5-8.5s11.5 3.7 11.5 8.5v2.5H12.5v-2.5z" />
      </g>
      <ellipse
        cx="24"
        cy="13"
        rx="8"
        ry="3.2"
        fill={onPrimary ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.25)"}
      />
    </svg>
  );
}

export default HrLogo;
