import { BookingInterface } from "@/src/models/BookingModel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: BookingInterface;
  onPress?: () => void;
};

const statusColors = {
  confirmed: "#4CAF50",
  pending: "#FFC107",
  cancelled: "#F44336",
};

const statusIcons = {
  confirmed: "check-circle" as const,
  pending: "clock" as const,
  cancelled: "close-circle" as const,
};

const BookingItem = (props: Props) => {
  const { item, onPress } = props;

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {item.propertyImage ? (
        <Image
          source={{ uri: item.propertyImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons name="image" size={40} color="#ccc" />
        </View>
      )}

      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.propertyTitle}>Property #{item.propertyId}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColors[item.status] },
            ]}
          >
            <MaterialCommunityIcons
              name={statusIcons[item.status]}
              size={16}
              color="white"
            />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.dateRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#666" />
          <Text style={styles.dateText}>
            {formatDate(item.checkIn)} - {formatDate(item.checkOut)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>$1,200</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingItem;

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
    flexDirection: "row",
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
    textTransform: "capitalize",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
