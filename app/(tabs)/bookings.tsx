import { BookingInterface } from "@/src/models/BookingModel";
import { fetchBookingsList } from "@/src/networkRequests/Api";
import BaseView from "@/src/views/hoc/BaseView";
import BookingItem from "@/src/views/items/BookingItem";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Bookings = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["bookingData"],
    queryFn: fetchBookingsList,
  });

  const renderItem = ({ item }: { item: BookingInterface }) => {
    return <BookingItem key={item?.id} item={item} />;
  };

  return (
    <BaseView title="Bookings" isLoading={isPending} error={error?.message}>
      <View style={styles.container}>
        <FlatList
          data={data || []}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
        />
      </View>
    </BaseView>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
