import { BASE_URL } from '../config';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Linking,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import axios from 'axios';
import styles, { COLORS } from '../styles/AuthStyles';


export default function AuthScreen({ onLoginSuccess, onBack }) {
  const { width } = useWindowDimensions();
  const isWeb = width > 600;

  const [mode, setMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false); 

  // Function to show alerts on both Web and Mobile
  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // --- Login Function ---
  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Warning", "Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      // Make sure the IP matches your machine's IP
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: email.trim(),
        password: password
      }, { timeout: 8000 }); // 8 seconds timeout

      if (response.status === 200) {
        showAlert("Success", "Welcome back!");
        onLoginSuccess(); 
      }
    } catch (error) {
      console.log("Login Debug:", error);
      let msg = "Login failed. Check your connection.";
      
      if (error.response) {
        // Server responded with an error (401, 400, etc.)
        msg = error.response.data.message || "Invalid credentials";
      } else if (error.request) {
        // Request made but no response (IP error)
        msg = "Cannot reach server. Please check if the Backend is running and IP is correct.";
      }
      
      showAlert("Login Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // --- Register Function ---
  const handleRegister = async () => {
    if (!email || !password || !username) {
      showAlert("Warning", "Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username: username,
        email: email.trim(),
        password: password
      }, { timeout: 8000 });

      if (response.status === 201 || response.status === 200) {
        showAlert("Success", "Account created successfully!");
        onLoginSuccess(); // Redirect to home immediately
      }
    } catch (error) {
      console.log("Register Debug:", error);
      let msg = "Registration failed.";
      
      if (error.response) {
        msg = error.response.data.message || "Email might be already in use";
      } else if (error.request) {
        msg = "Server unreachable. Check your network or IP address.";
      }
      
      showAlert("Registration Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={[styles.card, isWeb && styles.webCard]}>

        <TouchableOpacity onPress={onBack} style={styles.backButtonTop}>
          <Text style={styles.backButtonText}>✕ Close</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>AUTO PARTS</Text>
        <Text style={styles.subtitle}>Car Parts Company</Text>

        {/* ================= LOGIN ================= */}
        {mode === 'login' && (
          <>
            <TextInput 
              placeholder="Email" 
              style={styles.input} 
              placeholderTextColor="#999"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#999"
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setMode('forgot')}>
              <Text style={styles.forgotRight}>Forgot password?</Text>
            </TouchableOpacity> 

            <TouchableOpacity 
              style={[styles.button, loading && { opacity: 0.7 }]} 
              onPress={handleLogin} 
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            <View style={styles.socialSection}>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={[styles.iconCircle, { backgroundColor: COLORS.facebook }]} onPress={() => Linking.openURL('https://facebook.com')}>
                  <Text style={styles.iconText}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconCircle, { backgroundColor: COLORS.google }]} onPress={() => Linking.openURL('https://google.com')}>
                  <Text style={styles.iconText}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconCircle, { backgroundColor: COLORS.apple }]} onPress={() => Linking.openURL('https://apple.com')}>
                  <Text style={styles.iconText}>A</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => setMode('register')}>
              <Text style={styles.create}>Don't have an account? Create one</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ================= REGISTER ================= */}
        {mode === 'register' && (
          <>
            <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#999" onChangeText={setUsername} />
            <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#999" onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#999" onChangeText={setPassword} />

            <TouchableOpacity 
              style={[styles.button, loading && { opacity: 0.7 }]} 
              onPress={handleRegister} 
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode('login')}>
              <Text style={styles.back}>← Back to Login</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {mode === 'forgot' && (
          <>
            <TextInput placeholder="Email Address" style={styles.input} placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('login')}>
              <Text style={styles.back}>← Back to Login</Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </ScrollView>
  );
}

