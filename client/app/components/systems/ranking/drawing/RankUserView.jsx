import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../../../../constants";
import CustomButton from "../../../CustomButton";
import { sendFriendRequest } from "../../../../api/UserApi";
import { AuthContext } from "../../../../context/AuthContext";

const RankUserView = ({ item }) => {
  const { userInfo } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.rank}>
        <Text>{item.rank}</Text>
      </View>
      <View style={styles.avatar}>
        <Image style={styles.avatar} source={{ uri: item.avatarUrl }}></Image>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.expGain}>{item.name}</Text>
      </View>
      <View style={styles.addFriend}>
        <CustomButton
          styles={styles}
          label={"Kết bạn"}
          isValid={true}
          onPress={async () => {
            await sendFriendRequest({
              senderId: userInfo._id,
              recipientId: item._id,
            });
          }}
        ></CustomButton>
      </View>
    </View>
  );
};

export default RankUserView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.small,
    alignItems: "center",
    width: "100%",
    height: 70,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },

  rank: {
    flex: 1,
    borderRadius: 99,
    borderWidth: 1,
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },

  userInfo: {
    flex: 4,
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
  },

  userName: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: COLORS.text,
  },

  expGain: {
    fontFamily: "sfProRegular",
    fontSize: SIZES.small,
    color: COLORS.text,
  },

  addFriend: {
    flex: 2,
    textAlign: "center",
    justifyContent: "center",
  },

  btnContainer: () => ({
    backgroundColor: COLORS.green,
    borderRadius: 99,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },
});