// UserInterface.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { createTable, insertUser, getUsers, updateUser, deleteUser } from './Database';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  userItem: {
    marginBottom: 10,
  },
});

const UserInterface = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    createTable();
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    getUsers(data => setUsers(data));
  };

  const handleInsert = () => {
    if (name && email) {
      insertUser(name, email);
      refreshUsers();
      setName('');
      setEmail('');
    } else {
      alert('Please enter both name and email.');
    }
  };

  const handleUpdate = (id) => {
    const updatedName = prompt('Enter updated name:');
    const updatedEmail = prompt('Enter updated email:');
    if (updatedName !== null && updatedEmail !== null) {
      updateUser(id, updatedName, updatedEmail);
      refreshUsers();
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      deleteUser(id);
      refreshUsers();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create User:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Button title="Insert User" onPress={handleInsert} />

      <Text>Users:</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{`ID: ${item.id}, Name: ${item.name}, Email: ${item.email}`}</Text>
            <Button title="Update" onPress={() => handleUpdate(item.id)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default UserInterface;
