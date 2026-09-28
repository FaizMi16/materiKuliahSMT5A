// ============================================
// LANGKAH 1 — IMPORT
// ============================================
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

// ============================================
// LANGKAH 2 — DATA
// ============================================
const PROFILE = {
  name: 'Faiz Muzaki Irsyad',
  title: 'Full-Stack Mobile Developer',
  email: 'faizmi006@gmail.com',
  phone: '+64 858-9107-4916',
  location: 'Cirebon, Jawa Barat',
  bio: 'Pengembang aplikasi mobile berpengalaman 4 tahun yang berfokus pada React Native & Flutter.',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcmBiBfLfV-Ugsh9KU15b2WDf3wSzuvvHPyuNMmKuFag&s=10',
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter',      level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript',   level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript',   level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js',      level: 70, color: '#339933' },
  { id: '6', name: 'Firebase',     level: 82, color: '#FFCA28' },
  { id: '7', name: 'Python',       level: 85, color: '#3776AB' },
  { id: '8', name: 'C++',          level: 78, color: '#00599C' },
  { id: '9', name: 'PHP',          level: 72, color: '#777BB4' },
];

const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja & Proyek',
    data: [
      {
        id: 'e1',
        role: 'Aplikasi Perpustakaan (Kerja Mandiri)',
        company: 'Proyek Mata Kuliah Pemrograman Berorientasi Objek',
        period: '2025',
        desc: 'Membangun aplikasi mobile perpustakaan berbasis React Native secara berkelompok. Fitur: katalog buku, peminjaman, pengembalian, dan riwayat transaksi anggota.',
      },
      {
        id: 'e2',
        role: 'Kenyang.in — Web Pemesanan Makanan (Kerja Kelompok)',
        company: 'Proyek Mata Kuliah Pemrograman Web',
        period: '2026',
        desc: 'Membangun website pemesanan makanan "Kenyang.in" secara mandiri. Fitur: daftar menu, keranjang pesanan, checkout, dan simulasi pembayaran.',
      },
      {
        id: 'e3',
        role: 'Web Pelaporan Banjir (Kerja Mandiri)',
        company: 'Proyek Mata Kuliah Pemrograman Web',
        period: '2026',
        desc: 'Membangun website pelaporan banjir secara mandiri. Fitur: form pelaporan lokasi banjir, peta sebaran, upload foto bukti, dan status verifikasi laporan.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2028',
        desc: 'IPK 3.63 / 4.00',
      },
      // ✅ TUGAS WAJIB #3: Riwayat pendidikan baru
      {
        id: 'd2',
        role: 'SMA Negeri 2 Tangerang (IPS)',
        company: 'SMA Negeri 2 Tangerang',
        period: '2021 - 2024',
        desc: 'Lulus dengan lancar',
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', label: 'GitHub',    icon: '🐙', url: 'https://github.com/FaizMi16' }
];

// ============================================
// LANGKAH 3 — SUB-COMPONENTS
// ============================================
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

// ============================================
// LANGKAH 4 — MAIN COMPONENT (App)
// ============================================
export default function App() {
  // -- STATE --
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);

  // ✅ TUGAS PENGEMBANGAN #5: State untuk tab navigasi
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'skills' | 'kontak'

  // ✅ TUGAS PENGEMBANGAN #6: Animated values untuk avatar
  const fadeAnim = useRef(new Animated.Value(0)).current;   // opacity
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // scale

  // Jalankan animasi saat komponen pertama kali mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // -- HANDLER FUNCTIONS --
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim!`);
    }, 2000);
  };

  // -- RENDER --
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />

      {/* --- HEADER BAR --- */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>

      {/* ✅ TUGAS PENGEMBANGAN #5: Tab Navigasi Sederhana */}
      <View style={styles.tabBar}>
        {['info', 'skills', 'kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === tab && styles.tabBtnTextActive,
              ]}
            >
              {tab === 'info' && '👤 Info'}
              {tab === 'skills' && '🛠️ Skills'}
              {tab === 'kontak' && '✉️ Kontak'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ TUGAS PENGEMBANGAN #4: KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ============ TAB: INFO ============ */}
          {activeTab === 'info' && (
            <>
              <View style={styles.profileSection}>
                {/* ✅ TUGAS PENGEMBANGAN #6: Avatar dengan Animasi */}
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  }}
                >
                  <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
                </Animated.View>

                {openToWork && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✅ Open to Work</Text>
                  </View>
                )}
                <Text style={styles.profileName}>{PROFILE.name}</Text>
                <Text style={styles.profileTitle}>{PROFILE.title}</Text>
                <Text style={styles.profileBio}>{PROFILE.bio}</Text>
                <View style={styles.contactRow}>
                  <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
                  <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
                </View>
                <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>

                <View style={styles.socialRow}>
                  {SOCIAL.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={styles.socialBtn}
                      onPress={() => Alert.alert('🔗 Link', s.url)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.socialIcon}>{s.icon}</Text>
                      <Text style={styles.socialLabel}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.downloadBtn,
                    pressed && styles.downloadBtnPressed,
                  ]}
                  onPressIn={() => setPressing(true)}
                  onPressOut={() => setPressing(false)}
                  onPress={() => Alert.alert('📥 Download', 'CV sedang diunduh...')}
                >
                  <Text style={styles.downloadBtnText}>
                    {pressing ? '⏳ Mengunduh...' : '📥 Download CV (PDF)'}
                  </Text>
                </Pressable>
              </View>

              {/* Riwayat (SectionList) */}
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>📋 Riwayat</Text>
                <Text style={styles.sectionSubtitle}>
                  ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
                </Text>
                <SectionList
                  sections={SECTIONS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TimelineCard item={item} onPress={handleCardPress} />
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>
            </>
          )}

          {/* ============ TAB: SKILLS ============ */}
          {activeTab === 'skills' && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ FlatList: menampilkan list data secara efisien
              </Text>
              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SkillCard item={item} />}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
            </View>
          )}

          {/* ============ TAB: KONTAK ============ */}
          {activeTab === 'kontak' && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>✉️ Hubungi Saya</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ TextInput, Button, ActivityIndicator
              </Text>

              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              {sending ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="large" color="#7c3aed" />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <Button title="📨 Kirim Pesan" color="#7c3aed" onPress={handleSend} />
              )}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- MODAL --- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================
// LANGKAH 11 — STYLESHEET
// ============================================
const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  // -- LAYOUT DASAR --
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },

  // -- HEADER BAR --
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },

  // -- TAB BAR (Tugas Pengembangan #5) --
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#141422',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.accent,
    backgroundColor: '#1a1a2e',
  },
  tabBtnText: {
    color: COLORS.textDim,
    fontSize: 13,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: COLORS.accentLight,
  },

  // -- SECTION PROFIL --
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: { color: COLORS.success, fontSize: 12, fontWeight: '700' },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  // -- SOSIAL MEDIA --
  socialRow: { flexDirection: 'row', gap: 12, marginTop: 16, marginBottom: 20 },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: { color: COLORS.accentLight, fontSize: 11, fontWeight: '600' },

  // -- PRESSABLE DOWNLOAD --
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: { backgroundColor: '#5b21b6' },
  downloadBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  // -- SECTION BOX --
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  // -- SECTION LIST HEADER --
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  // -- SKILL CARD --
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 4 },

  // -- TIMELINE CARD --
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },

  // -- TEXT INPUT --
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: { height: 100, textAlignVertical: 'top' },

  // -- LOADING ROW --
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: { color: COLORS.accentLight, fontSize: 14, fontWeight: '600' },

  // -- MODAL --
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});