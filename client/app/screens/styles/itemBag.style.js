import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        marginLeft: 16,
    },
    icon: {
        fontSize: 20,
        color: '#00CF00',
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 16,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },
    categoryIcon: {
        color: 'pink',
        fontSize: 22,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height: "48%",
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    button: {
        borderRadius: 50,
        padding: 8,
        elevation: 2,
        width: "80%",
    },
    buttonUse: {
        backgroundColor: "#00BDF9",
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }
});

export default styles;