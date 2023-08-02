import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

function Update() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [title, setTitle] = useState(
    selectedTask.title ? selectedTask.title : ""
  );

  const handleEditTitle = async () => {
    //dados do payload
    let payload = {
      title,
    };
    try {
      //atualizar os dados
      await updateDoc(doc(db, "tasks", selectedTask.id), payload);

      //buscar os dados atualizados no firebase
      (async () => {
        //query para o firebase
        let qry = query(collection(db, "tasks"));
        //get  para o firebase
        let snapshot = await getDocs(qry);
        //gerar os dados
        let data = snapshot.docs.map((doc) => doc.data());
        //salvar no state os dados
        setTasks(data);
      })();
    } catch (error) {
      console.log(error);
    }
  };
  //faz o get
  useEffect(() => {
    (async () => {
      //query para o firebase
      let qry = query(collection(db, "tasks"));
      //get  para o firebase
      let snapshot = await getDocs(qry);
      //gerar os dados
      let data = snapshot.docs.map((doc) => doc.data());
      //salvar no state os dados
      setTasks(data);
    })();
  }, []);
  //popula o setTitle
  useEffect(() => {
    if (selectedTask.id) {
      setTitle(selectedTask.title);
    }
  }, [selectedTask]);
  return (
    <View>
      <Text>Update</Text>
      <View>
        <TextInput
          style={{
            width: 200,
            height: 40,
            borderRadius: 5,
            border: "1px solid #000",
          }}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TouchableOpacity
          onPress={handleEditTitle}
          style={{ backgroundColor: "blue", color: "#fff" }}
        >
          <Text style={{ color: "#fff" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column" }}>
        {tasks.map((task) => {
          return (
            <TouchableOpacity
              style={{
                width: 200,
                height: 50,
                margin: 20,
                borderWidth: selectedTask.id === task.id ? 1 : 0,
                borderColor: selectedTask.id === task.id ? "blue" : "",
              }}
              onPress={() => setSelectedTask(task)}
            >
              <Text>
                {task.id} - {task.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default Update;
