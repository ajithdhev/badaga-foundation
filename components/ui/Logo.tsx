interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = "" }: LogoProps) {
  return (
    <div
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={className}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="The Badaga Foundation"
        width={size}
        height={size}
        style={{ width: size, height: size, display: "block" }}
      />
    </div>
  );
}
