import { useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet
} from 'react-native';

/// DOCU https://reactnative.dev/docs/panresponder
const SwipeGesture = ({ children, onSwipePerformed, itemId }) => {
  const pan = useRef(new Animated.ValueXY()).current;


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('pan responder')
        pan.setOffset({
          x: pan.x._value,
        });

      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        const x = gestureState.dx;
        if (x >= 0) {
          onSwipePerformed('right', itemId)
        }
        else {
          onSwipePerformed('left', itemId)
        }

      }
    })).current;

  return (
    <Animated.View {...panResponder.panHandlers} style={{ ...styles.gestureStyle, transform: [{ translateX: pan.x }] }}>
      <View>{children}</View>
    </Animated.View>
  )
}

export default SwipeGesture;

const styles = StyleSheet.create({
  gestureStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 200
  }
})