import { Button, Dimensions } from "react-native";
import {
  withTiming,
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Ball } from "./ball";

export const Timing = () => {
  const floor = Dimensions.get("window").height - 100;

  const offset = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  });

  const runAnimation = () =>
    (offset.value = withTiming(floor, {
      duration: 2000,
      easing: Easing.ease,
    }));

  const resetAnimation = () => (offset.value = 0);

  return (
    <>
      <Ball style={heightStyle} />
      <Button onPress={runAnimation} title="Start" />
      <Button onPress={resetAnimation} title="Reset" />
    </>
  );
};
