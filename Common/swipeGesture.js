import { useRef, useEffect, useState } from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet
} from 'react-native';

/// DOCU https://reactnative.dev/docs/panresponder

const SwipeGesture = ({children, itemId,  onSwipePerformed}) => { 
    const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
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
          onSwipePerformed('right',itemId)
        }
        else {
          onSwipePerformed('left', itemId)
        }

      }
    })).current;

  return (
    <Animated.View {...panResponder.panHandlers}  style={{...styles.gestureStyle, transform: [{ translateX: pan.x},{rotateZ: pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]}) }]}}>
      {console.log('paneo', `deg` )}
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