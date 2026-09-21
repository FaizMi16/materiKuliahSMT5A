import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CV Sederhana</Text>

      <Text style={styles.label}>Nama Lengkap</Text>
      <Text>Faiz Muzaki Irsyad</Text>

      <Text style={styles.label}>NIM</Text>
      <Text>2488010047</Text>

      <Text style={styles.label}>Asal Sekolah</Text>
      <Text>UINSSC</Text>

      <Text style={styles.label}>Cita-cita</Text>
      <Text>Ingin lulus kuliah tepat waktu</Text>

      <Text style={styles.label}>Rencana Mencapai Cita-cita</Text>
      <Text>1. Rajin masuk kuliah dan mengerjakan tugas</Text>
      <Text>2. Belajar dengan teratur sebelum ujian</Text>
      <Text>3. Menyelesaikan skripsi dengan baik</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});