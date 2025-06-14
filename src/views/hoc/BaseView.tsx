import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";

type Props = {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  children?: React.ReactNode;
  renderLoader?: () => React.ReactNode;
  renderError?: (error: string) => React.ReactNode;
  useScroll?: boolean;
};

const BaseView: React.FC<Props> = ({
  title,
  showBackButton = false,
  rightComponent,
  isLoading = false,
  error = null,
  children,
  renderLoader,
  renderError,
  useScroll = false,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return renderLoader ? (
        renderLoader()
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.statusText}>Loading...</Text>
        </View>
      );
    }

    if (error) {
      return renderError ? (
        renderError(error)
      ) : (
        <View style={styles.center}>
          <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
        </View>
      );
    }

    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   return renderEmpty ? (
    //     renderEmpty()
    //   ) : (
    //     <View style={styles.center}>
    //       <Text style={styles.statusText}>No data available.</Text>
    //     </View>
    //   );
    // }

    return useScroll ? <ScrollView>{children}</ScrollView> : <>{children}</>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {title && (
        <Header
          title={title}
          showBackButton={showBackButton}
          rightComponent={rightComponent}
        />
      )}
      {renderContent()}
    </SafeAreaView>
  );
};

export default BaseView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  statusText: {
    fontSize: 16,
    marginTop: 12,
    color: "#444",
  },
  errorText: {
    color: "red",
  },
});
