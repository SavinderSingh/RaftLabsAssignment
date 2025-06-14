import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    top: 16,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  rightComponent: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
