import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import RankUserView from "./RankUserView";
import { SIZES } from "../../../../constants";

const renderItem = ({ item }) => <RankUserView item={item}></RankUserView>;

const RankColumns = ({ items }) => {
  const rankedItems = items
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <FlatList
      data={rankedItems}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item._id)}
      contentContainerStyle={{ rowGap: SIZES.medium }}
      scrollEnabled={false}
    ></FlatList>
  );
};

export default RankColumns;

const styles = StyleSheet.create({});
