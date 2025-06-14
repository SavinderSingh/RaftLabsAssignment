import { PropertyInterface } from "@/src/models/PropertyModel";
import { fetchPropertiesList } from "@/src/networkRequests/Api";
import { Actions, State, useStore } from "@/src/store/store";
import BaseView from "@/src/views/hoc/BaseView";
import PropertyItem from "@/src/views/items/PropertyItem";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Home = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["propertyData"],
    queryFn: fetchPropertiesList,
  });

  const { setProperties } = useStore<Actions>((state) => state);
  const { properties } = useStore<State>((state) => state);

  useEffect(() => {
    if (data) {
      setProperties(data);
    }
  }, [data, setProperties]);

  const renderItem = ({ item }: { item: PropertyInterface }) => {
    return <PropertyItem key={item?.id} item={item} />;
  };

  return (
    <BaseView
      title="Home"
      isLoading={isPending}
      error={error?.message}
      onRetry={refetch}
    >
      <View style={styles.container}>
        <FlatList
          data={properties || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={false}
          ListEmptyComponent={<View />}
        />
      </View>
    </BaseView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
