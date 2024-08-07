import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { getUnreadMessagesCount } from "../../api/MessageApi";
import { socket } from "../../utils/config";

const MessageCardView = ({ item, onPress }) => {
  const [unReadNumber, setUnreadNumber] = useState(0);
  const [newestMessage, setNewestMessage] = useState("");
  const { userInfo } = useContext(AuthContext);

  const getUnreadNumBer = async () => {
    const res = await getUnreadMessagesCount({
      userId: userInfo._id,
      friendId: item._id,
    });

    setUnreadNumber(res.data);
  };

  const handleNewestMessage = () => {
    socket.on("notification", (newMessage) => {
      if (newMessage.senderId === item._id) {
        setNewestMessage(newMessage.message);
      }
    });
  };
  useEffect(() => {
    handleNewestMessage();
    getUnreadNumBer();
  }, [newestMessage]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: item.avatarUrl,
          }}
          style={styles.avatar}
          imageStyle={styles.avatar}
        >
          <View style={styles.unreadNumber}>
            <Text style={{ color: COLORS.background, fontSize: 12 }}>
              {unReadNumber}
            </Text>
          </View>
        </ImageBackground>

        <View style={{ width: SIZES.large }}></View>

        <View style={styles.message}>
          <View style={styles.messageHeader}>
            <Text style={styles.userName}>{item.name}</Text>

            <Text style={styles.date}>{item.date}</Text>
          </View>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.messageText}
          >
            {newestMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCardView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.xxLarge * 2,
    padding: SIZES.medium,
    borderWidth: 0.2,
    borderColor: COLORS.primaryDark,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.medium,
    backgroundColor: 'white'
  },

  avatar: {
    width: SIZES.xLarge * 2.5,
    height: SIZES.xLarge * 2.5,
    borderRadius: SIZES.xLarge * 2.5,
  },

  // unreadNumber on the top right corner of the avatar
  unreadNumber: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.button,
    width: SIZES.large,
    height: SIZES.large,
    borderRadius: SIZES.large,
    borderColor: COLORS.background,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },

  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userName: {
    color: COLORS.text,
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
  },

  date: {
    color: COLORS.text,
  },

  messageText: {
    color: COLORS.text,
    fontWeight: "bold",
    // show ... if the message is too long
    overflow: "hidden",
  },
});
