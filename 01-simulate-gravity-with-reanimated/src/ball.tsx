import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  style: any;
}

export const Ball = (props: Props) => {
  return <Animated.View style={[styles.ball, props.style]} />;
};

const styles = StyleSheet.create({
  ball: {
    position: "absolute",
    top: 0,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#255fff",
  },
});
