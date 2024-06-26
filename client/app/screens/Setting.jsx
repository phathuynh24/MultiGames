import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { HorizontalItem, AppBar } from "../components";
import { AuthContext } from "../context/AuthContext";
import styles from "./styles/setting.style";

const Setting = () => {
  const navigation = useNavigation();
  const { logout, userInfo } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppBar title="Settings" onPressLeftIcon={() => navigation.goBack()} />
      <View style={styles.separator} />
      <HorizontalItem
        title="Account Management"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />
      <HorizontalItem
        title="Message Notification"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Privacy"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="General"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />
      <HorizontalItem
        title="Clear Cache"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Quick Repair"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <HorizontalItem
        title="Upload Log"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />
      <HorizontalItem
        title="About Us"
        desc="V 1.0.0"
        iconRight="arrow-forward"
        isCenter={false}
        onPress={() => {}}
      />
      <View style={styles.separator} />
      <HorizontalItem
        title="Log Out"
        isCenter={true}
        onPress={async () => {
          await logout({ id: userInfo._id });
        }}
      />
      <View style={styles.separator} />
    </View>
  );
};

export default Setting;
