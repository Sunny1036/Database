// UserDataComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import initDatabase from './Database';

const UserDataComponent = () => {
  const [userData, setUserData] = useState([]);
  const db = initDatabase();

  useEffect(() => {
    readUserData();
  }, []);

  const readUserData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM userData;',
        [],
        (_, { rows }) => {
          const fetchedUserData = rows.raw();
          setUserData(fetchedUserData);
          console.log('Fetched User Data:', fetchedUserData);
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    });
  };

  const insertUserData = () => {
    // Implement insert logic for userData here
    // You can use a form to get user input and insert it into the userData table
  };

  const updateUserData = () => {
    // Implement update logic for userData here
  };

  const deleteUserData = () => {
    // Implement delete logic for userData here
  };

  return (
    <View>
      {/* <Button title="Insert User Data" onPress={insertUserData} />
      <Button title="Update User Data" onPress={updateUserData} />
      <Button title="Delete User Data" onPress={deleteUserData} /> */}
    </View>
  );
};

export default UserDataComponent;
