import { Button, Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
} from "react-native-reanimated";
import { Ball } from "./ball";
import { accelerate, bounce, clamp, move } from "./utils";

export const Physics = () => {
  const ground = Dimensions.get("window").height - 100;

  const velocity = useSharedValue(0);
  const position = useSharedValue(0);

  const frameCallback = useFrameCallback((frameInfo) => {
    if (!frameInfo.timeSincePreviousFrame) {
      return;
    }

    const acceleration = 413;
    const deltaTime = Math.min(frameInfo.timeSincePreviousFrame, 64) / 1000;

    accelerate(velocity, { acceleration, deltaTime });
    move(position, { velocity, deltaTime });
    clamp(position, { lower: 0, upper: ground });
    // bounce(position, velocity, { bounciness: 0.8, boundary: [0, ground] });
  }, false);

  const heightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: position.value,
        },
      ],
    };
  });

  return (
    <>
      <Ball style={heightStyle} />
      <Button onPress={() => frameCallback.setActive(true)} title="Start" />
      <Button
        onPress={() => {
          frameCallback.setActive(false);
          velocity.value = 0;
          position.value = 0;
        }}
        title="Reset"
      />
    </>
  );
};
