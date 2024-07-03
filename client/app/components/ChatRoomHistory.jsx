import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import styles from "./styles/chatbox.style";

const ChatRoomHistory = ({ message }) => {
  return (
    <View style={styles.chatBox}>
      <FlatList
        data={message}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", width: "80%" }}>
            <Text style={styles.senderName}>{item.sender}: </Text>
            <Text style={styles.context}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ChatRoomHistory;
