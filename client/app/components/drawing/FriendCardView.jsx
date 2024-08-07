import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants";
import { getUserById } from "../../api";
import CustomButton from "../CustomButton";
import { socket } from "../../utils/config";
import { LinearGradient } from "expo-linear-gradient";

const FriendCardView = ({ item, roomId }) => {
  const [friendInfo, setFriendInfo] = useState(null);
  const [isSentInvite, setIsSentInvite] = useState(false);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await getUserById({ id: item });

        if (res.data.socketId === null) {
          return;
        }

        setFriendInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriend();
  }, []);

  const handleSendInvite = () => {
    // console.log(roomId, item)
    socket.emit("invite", { room: roomId, friendId: friendInfo.socketId });
    setIsSentInvite(true);
  };

  const handleRemoveFriend = () => {
    console.log("remove friend");
  };

  return (
    friendInfo && (
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatar}
            source={{ uri: friendInfo.avatarUrl }}
          ></Image>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{friendInfo.name}</Text>
          <Text style={styles.expGain}>{friendInfo.name}</Text>
        </View>

        {roomId ? (
          <View style={styles.invite}>
            {!isSentInvite ? (
              <LinearGradient
                colors={COLORS.greenGradient}
                style={styles.btnContainer()}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
              >
                <CustomButton
                  onPress={handleSendInvite}
                  styles={styles}
                  label={"Invite"}
                  isValid={true}
                ></CustomButton>
              </LinearGradient>
            ) : (
              <Text>Pending</Text>
            )}
          </View>
        ) : (
          <View style={styles.invite}>
            <LinearGradient
              colors={COLORS.blueGradient}
              style={styles.btnContainer()}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
            >
              <CustomButton
                onPress={handleRemoveFriend}
                styles={styles}
                label={"Remove"}
                isValid={false}
              ></CustomButton>
            </LinearGradient>
          </View>
        )}
      </View>
    )
  );
};

export default FriendCardView;

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

  avatar: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
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
    fontFamily: "sfPro",
    fontSize: SIZES.small,
    color: COLORS.text,
  },

  invite: {
    flex: 3,
    textAlign: "center",
    justifyContent: "center",
  },

  btnContainer: () => ({
    padding: 5,
    width: "100%",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  }),

  btnLabel: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },

  frStatusContainer: {
    padding: 5,
    width: "100%",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },

  frStatusText: {
    fontFamily: "sfProBold",
    fontSize: SIZES.medium,
    color: "white",
  },
});
