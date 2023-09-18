import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import NavBar from "./NavBar";
import Input from "./Input";
import Container from "./Container";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isEmpty, setEmpty] = useState(true);

  const handleQuestionSubmit = () => {
    setApiResponse(userInput);
    setUserInput(""); // clears the input after submitting
    setEmpty(false);
  };

  return (
    <SafeAreaView style={styles.app}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
      >
        <NavBar />
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          bounces={false}
        >
          <Container isEmpty={isEmpty} question={apiResponse} from={"user"} />
        </ScrollView>
        <Input
          userInput={userInput}
          setUserInput={setUserInput}
          handleQuestionSubmit={handleQuestionSubmit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default App;
