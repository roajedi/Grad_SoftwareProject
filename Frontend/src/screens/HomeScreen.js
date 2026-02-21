import { BASE_URL } from '../config';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView, 
  Alert,
  Platform
} from 'react-native';
import axios from 'axios';
import styles from '../styles/HomeStyles';

export default function HomeScreen({ onLogout, isLoggedIn, onOpenLogin }) {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');

  // Update this IP to match your server's IP
  const API_URL = `${BASE_URL}/parts`;
  useEffect(() => {
    fetchParts();
  }, []);

  // Function to show alerts (Web compatible)
  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };
// عرض جميع القطع
  const fetchParts = async () => {
    try {
      const response = await axios.get(API_URL);
      setParts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  const addPart = async () => {
    // 1. Check if user is logged in
    if (!isLoggedIn) {
      if (Platform.OS === 'web') {
        alert("Please login to add new parts");
        onOpenLogin();
      } else {
        Alert.alert(
          "Access Denied", 
          "You must be logged in to add new parts", 
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login Now", onPress: onOpenLogin }
          ]
        );
      }
      return;
    }

    // 2. Fields Validation
    if (!name.trim() || !model.trim() || !price.trim()) {
      showAlert("Missing Info", "Please fill in all fields (Name, Model, and Price)");
      return;
    }

    try {
      const newPart = { name, car_model: model, price: Number(price) };
      const response = await axios.post(API_URL, newPart);
      
      if (response.status === 201 || response.status === 200) {
        // Reset Form
        setName(''); 
        setModel(''); 
        setPrice('');
        
        // Refresh List
        fetchParts(); 
        
        showAlert("Success", "The part has been added successfully!");
      }
    } catch (error) {
        console.error("Add Part Error:", error);
        showAlert("Error", "Failed to add the part to the server. Check your connection.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {isLoggedIn ? (
          <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onOpenLogin} style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.headerText}>AUTO PARTS</Text>
        <View style={{ width: 60 }} /> 
      </View>

      {/* Add Part Form */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Add New Part</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Part Name (e.g. Brake Pads)" 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Car Model (e.g. Toyota Camry)" 
          value={model} 
          onChangeText={setModel} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Price ($)" 
          value={price} 
          keyboardType="numeric" 
          onChangeText={setPrice} 
        />
        <TouchableOpacity style={styles.addButton} onPress={addPart}>
          <Text style={styles.buttonText}>Add to Inventory</Text>
        </TouchableOpacity>
      </View>

      {/* Parts List */}
      <View style={{ flex: 1 }}>
        <Text style={[styles.formTitle, { marginLeft: 20, marginTop: 10 }]}>Available Parts:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <FlatList
            data={parts}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardDetails}>{item.car_model} — ${item.price}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
