import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import Item from "./item";
import Loading from "../../components/Loading";
import axios from "axios";
import Error from "../../components/Error";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item id={item.id} name={item.name} />}
      />
    </View>
  );
};

export default UsersScreen;
