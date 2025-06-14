import { PropertyInterface } from "@/src/models/PropertyModel";
import BaseView from "@/src/views/hoc/BaseView";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PropertyDetail = () => {
  const { property } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState<PropertyInterface | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    if (property) {
      try {
        const data = JSON.parse(decodeURIComponent(property as string));
        setPropertyData(data);
      } catch (error) {
        console.error("Error parsing property data:", error);
      }
    }
    setLoading(false);
  }, [property]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!propertyData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Property data not available</Text>
      </View>
    );
  }
  const screenWidth = Dimensions.get("window").width;

  return (
    <BaseView useScroll title="Property Details" showBackButton>
      {/* Image Carousel */}
      <FlatList
        data={propertyData?.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const offset = e.nativeEvent.contentOffset.x;
          const index = Math.round(offset / screenWidth);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Image Indicator */}
      <View style={styles.indicatorContainer}>
        {propertyData?.images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{propertyData?.title}</Text>
        <Text style={styles.price}>
          ${propertyData?.price?.toLocaleString()}
        </Text>
        <Text style={styles.address}>
          {propertyData?.location?.address}, {propertyData?.location?.city},{" "}
          {propertyData?.location?.state}
        </Text>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresContainer}>
            {propertyData?.features?.map((feature, index) => (
              <Text key={index} style={styles.feature}>
                • {feature}
              </Text>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>

          <View style={styles.mapView}></View>
          {/* <Text style={styles.locationText}>
            Latitude:{" "}
            {propertyData?.location?.coordinates?.latitude?.toFixed(4)}
          </Text>
          <Text style={styles.locationText}>
            Longitude:{" "}
            {propertyData?.location?.coordinates?.longitude?.toFixed(4)}
          </Text> */}
        </View>
      </View>
    </BaseView>
  );
};

export default PropertyDetail;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#007bff",
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    color: "#2e8b57",
    fontWeight: "600",
    marginBottom: 12,
  },
  address: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  feature: {
    fontSize: 14,
    color: "#555",
    marginRight: 15,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  mapView: {
    height: 240,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
