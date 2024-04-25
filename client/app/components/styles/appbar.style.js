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
        color: COLORS.white,
    },
    iconRight: {
        fontSize: 20,
        color: COLORS.white,
    },
    iconLeft: {
        fontSize: 22,
        color: COLORS.white,
    },
});

export default styles;