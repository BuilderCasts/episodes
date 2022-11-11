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

  return (
    <>
      <Ball style={heightStyle} />
      <Button
        onPress={() =>
          (offset.value = withTiming(floor, {
            duration: 2000,
            easing: Easing.ease,
          }))
        }
        title="Start"
      />
      <Button onPress={() => (offset.value = 0)} title="Reset" />
    </>
  );
};
