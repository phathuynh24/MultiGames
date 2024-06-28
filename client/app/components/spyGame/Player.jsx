import React from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../styles/player.style";

const Player = ({
  id,
  name,
  avatar,
  confirmVote,
  isReady,
  description,
  isShowDes,
  isShowVote,
  voteCount = 0,
}) => {
  return (
    <View key={id} style={styles.player}>
      <View style={styles.statusDot(isReady)} />
      {isShowDes && (
        <View style={styles.descChat}>
          <Text>{description}</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => confirmVote(id)}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        {isShowVote && <View style={styles.descChat}>
          <Text>
            Số phiếu: {voteCount}
          </Text>
        </View>}
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 10 }}>{name}</Text>
    </View>
  );
};
export default Player;
