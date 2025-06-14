import { fetchProfile } from "@/src/networkRequests/Api";
import BaseView from "@/src/views/hoc/BaseView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["profileData"],
    queryFn: fetchProfile,
  });

  if (isPending) {
    return (
      <BaseView>
        <ActivityIndicator size="large" color="#007AFF" />
      </BaseView>
    );
  }

  if (error) {
    return (
      <BaseView>
        <Text>Error loading profile</Text>
      </BaseView>
    );
  }

  return (
    <BaseView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {data?.photo ? (
              <Image source={{ uri: data.photo }} style={styles.avatar} />
            ) : (
              <MaterialCommunityIcons
                name="account-circle"
                size={80}
                color="#007AFF"
              />
            )}
          </View>

          <Text style={styles.name}>{data?.name || "User"}</Text>
          <Text style={styles.email}>{data?.email}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={24}
              color="#007AFF"
            />
            <Text style={styles.statValue}>{data?.bookings?.length || 0}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="account" size={20} color="#666" />
            <Text style={styles.detailText}>{data?.name}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="email" size={20} color="#666" />
            <Text style={styles.detailText}>{data?.email}</Text>
          </View>
        </View>
      </View>
    </BaseView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    paddingVertical: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
