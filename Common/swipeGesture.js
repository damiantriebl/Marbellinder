import { useRef } from 'react';
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
    <Animated.View {...panResponder.panHandlers}  style={{ ...styles.shadowProp,...styles.card, transform: [{ translateX: pan.x},{rotateZ: pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]}) }]}}>
      <View>{children}</View>
    </Animated.View>
  )
}

export default SwipeGesture;

const styles = StyleSheet.create({

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginBottom: -590,
    height:600,
    textAlign: "center"
},
shadowProp: {
  elevation: 12,
  shadowColor: '#01132E',
},
})