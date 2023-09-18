import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Container = ({ question, from }) => {
  const [data, setData] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [data]);

  useEffect(() => {
    if (from === "user" && question) {
      setData([...data, { from: "user", body: question }]);
      generateImage();
    }
  }, [question]);

  const generateImage = async () => {
    setData((prev) => [...prev, { from: "bot", body: "Please wait..." }]);

    const options = {
      method: "POST",
      headers: {
        Authorization: "Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        version:
          "436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
        input: { prompt: question },
      }),
    };

    try {
      const response = await fetch(
        "https://api.replicate.com/v1/predictions",
        options
      );

      const responseData = await response.json();
      // console.log("Main Request Response:", responseData);

      if (response.status === 201) {
        const getStatusUrl = responseData.urls.get;

        // Poll for status
        const intervalId = setInterval(async () => {
          const statusResponse = await fetch(getStatusUrl, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`,
            },
          });

          const statusData = await statusResponse.json();
          // console.log("Polling Response:", statusData);

          if (statusData.status === "succeeded") {
            clearInterval(intervalId);

            // Update the last bot message with the image URL
            setData((prev) => {
              const updatedData = [...prev];
              updatedData[updatedData.length - 1] = {
                from: "bot",
                body: statusData.output[0],
              };
              return updatedData;
            });
          }
        }, 1000); // poll every second
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setData((prev) => {
        const updatedData = [...prev];
        updatedData[updatedData.length - 1] = {
          from: "bot",
          body: "Error generating image.",
        };
        return updatedData;
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {data.map((item, index) =>
          item.from === "user" ? (
            <QuestionCard key={index} body={item.body} from="user" />
          ) : (
            <QuestionCard key={index} body={item.body} from="bot" />
          )
        )}
      </ScrollView>
    </View>
  );
};

const QuestionCard = ({ body, from }) => {
  const isImage = body.startsWith("http");

  return (
    <View style={styles.question}>
      <View
        style={from === "user" ? styles.circleUser : styles.circleBot}
      ></View>
      <View style={styles.body}>
        {isImage ? (
          <Image
            source={{ uri: body }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 15,
            }}
          />
        ) : (
          <Text>{body}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  question: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 15,
    gap: 10,
  },
  circleUser: {
    width: 35,
    height: 35,
    backgroundColor: "#3498db",
    borderRadius: 50,
  },
  circleBot: {
    width: 35,
    height: 35,
    backgroundColor: "#2ecc71",
    borderRadius: 50,
  },
  body: {
    flex: 1,
  },
});

export default Container;
