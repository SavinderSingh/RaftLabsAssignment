import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  onRetry?: () => void;
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
  onRetry,
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
          {onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

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
    textAlign: "center",
  },
  errorText: {
    color: "red",
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#8E8E93",
    borderRadius: 4,
  },
  retryText: {
    color: "white",
    fontSize: 16,
  },
});
