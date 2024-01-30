// ViewDataScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getUsers } from './Database';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userItem: {
    marginBottom: 10,
  },
});

const ViewDataScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers(data => setUsers(data));
  };

  return (
    <View style={styles.container}>
      <Text>Saved User Data:</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{`ID: ${item.id}, Name: ${item.name}, Email: ${item.email}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewDataScreen;
