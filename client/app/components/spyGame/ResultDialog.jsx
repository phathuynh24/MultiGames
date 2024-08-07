import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
const ResultDialog = ({
  avatar,
  isVisible,
  onClose,
  duration,
  name,
  identify,
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.modalView}>
        <Text style={styles.gameTile}>Game result!</Text>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.title}>Player {name} is the spy.</Text>
        <Text style={styles.desc}> Congratulate {identify} on winning!</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ResultDialog;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    top: SIZES.height / 3.5,
    bottom: SIZES.height / 3.5,
    left: SIZES.width / 20,
    right: SIZES.width / 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: COLORS.blue,
  },

  gameTile: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.brightBlue,
    marginBottom: 10,
  },

  word: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
  desc: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "lightgreen",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  closeButtonText: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});
