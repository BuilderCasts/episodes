import { SharedValue } from "react-native-reanimated";

const getValue = (value: number | SharedValue<number>) => {
  "worklet";
  return (value as SharedValue<number>).value ?? value;
};

interface AccelerateConfig {
  acceleration: number | SharedValue<number>;
  deltaTime: number;
}
export const accelerate = (
  velocity: SharedValue<number>,
  { acceleration, deltaTime }: AccelerateConfig
) => {
  "worklet";
  velocity.value = velocity.value + getValue(acceleration) * deltaTime;
};

interface MoveConfig {
  velocity: number | SharedValue<number>;
  deltaTime: number;
}
export const move = (
  position: SharedValue<number>,
  { velocity, deltaTime }: MoveConfig
) => {
  "worklet";
  return (position.value = position.value + getValue(velocity) * deltaTime);
};

interface ClampConfig {
  lower: number;
  upper: number;
}
export const clamp = (
  value: SharedValue<number>,
  { lower, upper }: ClampConfig
) => {
  "worklet";
  value.value = Math.max(lower, getValue(value));
  value.value = Math.min(getValue(value), upper);
};

interface BounceConfig {
  bounciness: number;
  boundary: [number, number];
}
export const bounce = (
  position: SharedValue<number>,
  velocity: SharedValue<number>,
  { bounciness, boundary: [lower, upper] }: BounceConfig
) => {
  "worklet";
  clamp(position, { lower, upper });

  if (position.value === lower && velocity.value < 0) {
    velocity.value = -velocity.value * bounciness;
  }

  if (position.value === upper && velocity.value > 0) {
    velocity.value = -velocity.value * bounciness;
  }
};
