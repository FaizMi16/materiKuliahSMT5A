import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Halaman Login (Nama: Faiz Muzaki Irsyad NIM: 2488010047)</Text>
      <Button 
        title="Belum punya akun? Daftar di sini" 
        // Menggunakan navigation.navigate untuk pindah ke layar Signup
        onPress={() => navigation.navigate('Signup')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});