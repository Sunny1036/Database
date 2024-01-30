// ApiDataComponent.js
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import initDatabase from './Database';

const Apicall = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);
  const db = initDatabase();

  const requestbody = {
    grant_type: 'client_credentials',
    client_id: 'ncVp_GvzYR3u9kNba4Dt_V7nzx9DukmdsAi8nvZhB6U=',
    client_secret: 'pKDDd5K_UKG51_MZtyw_dz5RpQFgAoiKT9b4r5IiUto=',
    scope: 'accounts',
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://ob.sandbox.natwest.com/token',
        requestbody,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      setAccessToken(response.data.access_token);
      setShowAccessToken(true);

      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO apiData (data) VALUES (?);',
          [JSON.stringify(response.data)],
          (tx, results) => {
            console.log('Rows affected:', results.rowsAffected);
          },
          (error) => {
            console.error('Error inserting data:', error);
          }
        );
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLastResult = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM apiData ORDER BY id DESC LIMIT 1;',
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const lastResult = rows.item(0);
            setAccessToken(JSON.parse(lastResult.data).access_token);
            setShowAccessToken(true);
            console.log('Last Result:', lastResult.data);
          } else {
            console.log('No data found in apiData table.');
          }
        },
        (error) => {
          console.error('Error fetching last result:', error);
        }
      );
    });
  };

  const readApiData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM apiData;',
        [],
        (_, { rows }) => {
          const fetchedApiData = rows.raw();
          console.log('Fetched API Data:', fetchedApiData);
        },
        (error) => {
          console.error('Error fetching API data:', error);
        }
      );
    });
  };

  return (
    <View>
      {showAccessToken && <Text>Access Token: {accessToken}</Text>}
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <Button title="Fetch Access Token" onPress={fetchData} disabled={loading} />
      <Button title="Fetch Last Result" onPress={fetchLastResult} />
      <Button title="Read API Data" onPress={readApiData} />
    </View>
  );
};

export default Apicall;
