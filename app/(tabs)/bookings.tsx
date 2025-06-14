import { BookingInterface } from "@/src/models/BookingModel";
import { fetchBookingsList } from "@/src/networkRequests/Api";
import { Actions, State, useStore } from "@/src/store/store";
import BaseView from "@/src/views/hoc/BaseView";
import BookingItem from "@/src/views/items/BookingItem";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Bookings = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["bookingData"],
    queryFn: fetchBookingsList,
  });

  const { setBookings } = useStore<Actions>((state) => state);
  const { bookings } = useStore<State>((state) => state);

  useEffect(() => {
    if (data) {
      setBookings(data);
    }
  }, [data, setBookings]);

  const renderItem = ({ item }: { item: BookingInterface }) => {
    return <BookingItem key={item?.id} item={item} />;
  };

  return (
    <BaseView title="Bookings" isLoading={isPending} error={error?.message}>
      <View style={styles.container}>
        <FlatList
          data={bookings || []}
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
