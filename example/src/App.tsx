import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Example } from "./example";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Example />
    </GestureHandlerRootView>
  );
}
