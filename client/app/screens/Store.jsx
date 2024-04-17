import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, SafeAreaView, Modal, Pressable, TouchableOpacity } from "react-native";
import styles from './styles/store.style';
import { Dimensions } from 'react-native';

const Store = () => {
  const data = [
    { id: 1, image: require('../../assets/bg01.png'), description: "Description 1", price: 200, },
    { id: 2, image: require('../../assets/bg02.png'), description: "Description 2", price: 300, },
    { id: 3, image: require('../../assets/bg03.png'), description: "Description 3", price: 300, },
    { id: 4, image: require('../../assets/bg04.png'), description: "Description 4", price: 500, },
    { id: 5, image: require('../../assets/bg05.png'), description: "Description 5", price: 600, },
    { id: 6, image: require('../../assets/bg06.png'), description: "Description 6", price: 100, },
    { id: 7, image: require('../../assets/bg01.png'), description: "Description 1", price: 100, },
    { id: 8, image: require('../../assets/bg02.png'), description: "Description 2", price: 100, },
    { id: 9, image: require('../../assets/bg03.png'), description: "Description 3", price: 100, },
    { id: 10, image: require('../../assets/bg04.png'), description: "Description 4", price: 100, },
    { id: 11, image: require('../../assets/bg05.png'), description: "Description 5", price: 100, },
    { id: 12, image: require('../../assets/bg06.png'), description: "Description 6", price: 100, },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Ionicons name="cash-outline" style={styles.icon} />
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // Trong hàm handleItemPress, set state của modal và lớp phủ thành true
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    setOverlayVisible(true);
  };

  // Thêm hàm để đóng modal và lớp phủ
  const closeModal = () => {
    setModalVisible(false);
    setOverlayVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </Pressable>
          <Text style={styles.headerText}>Cửa hàng</Text>
        </View>
        <Ionicons name="cart" style={[styles.icon, { color: "#FFA500" }]} />
      </View>
      <View style={styles.separator} />
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Số dư tài khoản:</Text>
        <View style={styles.balanceContent}>
          <Ionicons name="cash-outline" style={styles.icon} />
          <Text style={styles.balanceAmount}>100</Text>
        </View>
      </View>
      <View style={styles.bannerContainer}>
        <Image source={require('../../assets/store_banner.png')} style={styles.bannerImage} />
      </View>
      <View style={styles.separator} />
      <View style={styles.categoryContainer}>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>Nền bảng vẽ</Text>
        <Ionicons name="flower-sharp" size={22} style={styles.categoryIcon} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />

      {isOverlayVisible ? <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.overlay} onPress={closeModal}></Pressable>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.itemContainer}>
              <Image source={selectedItem?.image} style={{ width: screenWidth * 0.8, height: screenWidth * 0.7, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
              <View style={{
                flexDirection: "row",
                alignSelf: "stretch", justifyContent: "space-between", padding: 20,
              }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{selectedItem?.description}</Text>
                <View style={styles.priceContainer}>
                  <Ionicons name="cash-outline" style={styles.icon} />
                  <Text style={styles.price}>{selectedItem?.price}</Text>
                </View>
              </View>
            </View>
            <Pressable style={[styles.button, styles.buttonBuy]} >
              <Text style={styles.textStyle}>Mua</Text>
            </Pressable>
          </View>
        </View>
      </Modal> : null}


    </SafeAreaView>
  );
};

export default Store;
