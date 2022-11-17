import { StyleSheet, View } from "react-native";
import { Timing } from "./src/timing";
import { Physics } from "./src/physics";

export default function App() {
  return (
    <View style={styles.container}>
      <Physics />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
