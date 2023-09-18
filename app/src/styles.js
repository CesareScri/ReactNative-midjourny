import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "red",
    height: 150,
    justifyContent: "space-between",
    position: "absolute",
    flexDirection: "row",
    top: -10,
    left: 0,
    right: 0,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  img: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 100,
    height: 50,
  },
});

export default styles;
