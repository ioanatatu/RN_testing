import "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

import React from "react";

const SIZE = 100;

export default function App() {
  const translateX = useSharedValue(0);

  // provide the pan gesture event property to the PagGestureHandler
  // useAnimatedGestureHandler = hook that provides callbacks
  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event) => {},
      onActive: (event) => {
        // when the pan is active, we need to update the shared value
        console.log(event.translationX);
        translateX.value = event.translationX;
      },
      onEnd: (event) => {},
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <PanGestureHandler>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.5)",
    borderRadius: 10,
  },
});
