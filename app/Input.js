import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import upArrow from "../assets/icons/up-arrow.png";

const Input = ({ userInput, setUserInput, handleQuestionSubmit }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    let keyboardShowEvent = "keyboardDidShow";
    let keyboardHideEvent = "keyboardDidHide";

    if (Platform.OS === "ios") {
      keyboardShowEvent = "keyboardWillShow";
      keyboardHideEvent = "keyboardWillHide";
    }

    const keyboardWillShowListener = Keyboard.addListener(
      keyboardShowEvent,
      () => setKeyboardVisible(true)
    );

    const keyboardWillHideListener = Keyboard.addListener(
      keyboardHideEvent,
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      padding: 10,
      backgroundColor: "#fff",
      zIndex: 1,
      marginBottom: keyboardVisible ? -20 : 0,
    },
    containerFocused: {
      paddingBottom: 200, // Adjust values as needed
    },
    btn: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: 30,
      height: 30,
      objectFit: "contain",
    },
    holder: {
      flex: 1,
      alignItems: "center",
      height: 50,
    },
    input: {
      width: "100%",
      height: 45,
      backgroundColor: "#ecf0f1",
      borderRadius: 20,
      color: "#000000",
      padding: 5,
      paddingLeft: 10,
      fontSize: 17,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.holder}>
          <TextInput
            value={userInput}
            onChangeText={setUserInput}
            style={styles.input}
            placeholder="generate image..."
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleQuestionSubmit}>
          <Image style={styles.img} source={upArrow} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;
