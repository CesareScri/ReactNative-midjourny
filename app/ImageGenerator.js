import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  Linking,
} from "react-native";

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState(null);
  const [status, setStatus] = useState(""); // to display the message to the user

  const generateImage = async (prompt) => {
    try {
      setStatus("Generating...");

      const response = await fetch("http://localhost:3000/v1/predictions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.status === 201) {
        const data = await response.json();
        const { get } = data.urls;

        const intervalId = setInterval(async () => {
          const statusResponse = await fetch(get);
          const statusData = await statusResponse.json();

          if (statusData.status === "succeeded") {
            clearInterval(intervalId);
            setStatus("");
            setImageUrl(statusData.output[0]);
          }
        }, 1000); // check every second
      }
    } catch (error) {
      setStatus("Failed to generate image.");
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Generate Image" onPress={() => generateImage("red cat")} />

      {status && (
        <View style={{ marginTop: 20 }}>
          <Text>{status}</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {imageUrl && (
        <View style={{ marginTop: 20 }}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
          />
          <Button title="Download" onPress={() => Linking.openURL(imageUrl)} />
        </View>
      )}
    </View>
  );
}

export default ImageGenerator;
