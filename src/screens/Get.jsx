import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
function Get() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState("");

  return (
    <View>
      <Text
        onPress={async () => {
          //Busca sem filtros
          let q = query(collection(db, "tasks"));

          //Busca com filtro no campo created_by
          // let q = query(collection(db, "tasks"), where('created_by','==', '12356'));

          //Busca com filtro no campo created_by e com order_by pelo campo de limitDate 'asc'||'desc'
          // let q = query(
          //   collection(db, "tasks"),
          //   where("created_by", "==", "12356"),
          //   orderBy("limitDate", "asc")
          // );
          //Busca com filtro no campo created_by e com order_by pelo campo de limitDate 'asc'||'desc' e limit
          // let q = query(
          //   collection(db, "tasks"),
          //   where("created_by", "==", "12356"),
          //   orderBy("limitDate", "asc"),
          //   limit(100)
          // );
          let querySnapshot = await getDocs(q);
          let data = querySnapshot.docs.map((doc) => doc.data());
          setTasks(data);
        }}
      >
        Get
      </Text>
    </View>
  );
}

export default Get;
