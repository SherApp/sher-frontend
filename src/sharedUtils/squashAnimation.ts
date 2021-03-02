interface SquashAnimationConfig {
  baseHeight: number;
  duration: number;
  onAnimationFrame: (newHeight: number) => void;
}

export const squashAnimation = ({
  baseHeight,
  duration,
  onAnimationFrame
}: SquashAnimationConfig) => {
  const step = baseHeight / duration;
  let startTime: number;

  const animationFrameCallback = (time: number) => {
    const elapsed = time - (startTime ??= time);
    const nextValue = baseHeight - step * elapsed;
    const nextHeight = Math.max(nextValue, 0);

    onAnimationFrame(nextHeight);

    if (nextValue >= 0) {
      window.requestAnimationFrame(animationFrameCallback);
    }
  };

  window.requestAnimationFrame(animationFrameCallback);
};
