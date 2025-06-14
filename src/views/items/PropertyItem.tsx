import { PropertyInterface } from "@/src/models/PropertyModel";
import { images } from "@/src/values/images";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  item: PropertyInterface;
};

const PropertyItem = (props: Props) => {
  const { item } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const propertyParams = encodeURIComponent(JSON.stringify(item));

  return (
    <Link
      href={{
        pathname: "/propertyDetail",
        params: { property: propertyParams },
      }}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        {isLoading && (
          <ActivityIndicator style={styles.loader} size="large" color="#888" />
        )}
        <Image
          source={{
            uri: imageError
              ? images.placeholderImage
              : item.images[0] || images.placeholderImage,
          }}
          style={[styles.image, { opacity: isLoading ? 0 : 1 }]}
          resizeMode="cover"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setImageError(true);
          }}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.price}>${item.price.toLocaleString()}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address} numberOfLines={1}>
          {item.location.address}
        </Text>
        {item.features.length > 0 && (
          <ScrollView style={styles.featuresContainer} horizontal>
            {item.features.map((feature, index) => (
              <Text key={index} style={styles.featureText}>
                • {feature}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
    </Link>
  );
};

export default PropertyItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  loader: {
    position: "absolute",
    zIndex: 1,
  },
  details: {
    padding: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: "#888",
    paddingLeft: 8,
  },
});
