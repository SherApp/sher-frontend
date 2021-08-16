interface Props {
  value?: number;
  radius?: number;
  stroke?: number;
}

const ProgressRing = ({ value = 0, radius = 16, stroke = 2 }: Props) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference * ((100 - value) / 100);

  return (
    <svg
      className="-rotate-90 transform"
      width={radius * 2}
      height={radius * 2}
    >
      <defs>
        <linearGradient id="themeGradient">
          <stop offset="0" stop-color="#8A0CE1" />
          <stop offset="100%" stop-color="#EC38BC" />
        </linearGradient>
      </defs>
      <circle
        className="stroke-current text-gray-300 dark:text-gray-700"
        r={normalizedRadius}
        fill="transparent"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
      />
      <circle
        r={normalizedRadius}
        stroke="url(#themeGradient)"
        strokeWidth={stroke}
        fill="transparent"
        cx={radius}
        cy={radius}
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: offset
        }}
      />
    </svg>
  );
};

export default ProgressRing;
