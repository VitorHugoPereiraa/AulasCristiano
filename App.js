import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db, app } from "./src/firebase";
import { useState } from "react";
import MyDatePicker from "./src/components/DatePicker";

//Import de func do firebase modular
import { doc, collection, setDoc } from "firebase/firestore";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [limitDate, SetLimitDate] = useState(new Date());
  console.log(db);

  const handleSubmit = async () => {
    let docRef = doc(collection(db, "tasks"));

    let payload = {
      id: docRef.id,
      title: title,
      description: description,
      limitDate: limitDate,
    };

    await setDoc(docRef, payload);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          width: 300,
          height: 50,
          borderColor: "#000",
          borderWidth: 1,
          marginBottom: 30,
        }}
        value={title}
        onChangeText={(e) => setTitle(e)}
      />
      <TextInput
        style={{
          width: 300,
          height: 50,
          borderColor: "#000",
          borderWidth: 1,
          marginBottom: 30,
        }}
        value={description}
        onChangeText={(e) => setDescription(e)}
      />
      <MyDatePicker
        selectedDate={limitDate}
        setSelectedDate={SetLimitDate}
        style={{ borderColor: "#000", borderWidth: 1 }}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          width: 200,
          height: 60,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text style={{ color: "#fff" }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
