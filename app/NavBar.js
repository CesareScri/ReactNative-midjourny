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

import Svg, { Circle, Rect } from "react-native-svg";

import personSVG from "../assets/icons/profile.png";
import searchSVG from "../assets/icons/search.png";

const SearchIcon = () => {
  return (
    <View style={styles.svg}>
      <Image source={searchSVG} style={styles.img} />
    </View>
  );
};

const PersonIcon = () => {
  return (
    <View style={styles.svg}>
      <Image source={personSVG} style={styles.img} />
    </View>
  );
};

const NavBar = () => {
  return (
    <View style={styles.header}>
      <SearchIcon />
      <View style={styles.headreTitle}>
        <Text style={styles.headreTitleText}>midjourney</Text>
      </View>
      <PersonIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    width: 45,
    height: 45,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 15,
  },

  img: {
    width: 22,
    height: 22,
    objectFit: "contain",
  },

  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    gap: 5,
    position: "sticky",
  },
  headreTitle: {
    flex: 1,
    height: 45,
    backgroundColor: "#ecf0f1",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
  },
  headreTitleText: {
    fontSize: 22,
  },
});

export default NavBar;
