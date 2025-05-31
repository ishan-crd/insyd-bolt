import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ImageCarousel({ images, containerStyle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width * 0.9));
    if (index !== currentIndex && index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {images.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dot, { opacity: index === currentIndex ? 1 : 0.5 }]}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.carouselContainer, containerStyle]}>
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={width * 0.9}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
      />
      {renderDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    alignSelf: "center",
    width: "90%",
    height: 195,
    marginTop: 28,
    borderRadius: 22,
    overflow: "hidden",
  },
  carouselContent: {
    alignItems: "center",
  },
  carouselImage: {
    width: width * 0.9,
    height: 195,
    borderRadius: 22,
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
});
