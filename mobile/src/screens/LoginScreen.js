
import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../services/auth';
export default function LoginScreen({ navigation }){
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onSubmit = async () => { try { await auth.login(identifier, password); navigation.replace('Dashboard'); } catch(e){ Alert.alert('Lỗi', 'Đăng nhập thất bại'); } };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý chi tiêu</Text>
      <TextInput style={styles.input} placeholder="Email hoặc username" value={identifier} onChangeText={setIdentifier} />
      <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Đăng nhập" onPress={onSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 16 }, title: { fontSize: 20, marginBottom: 12, textAlign: 'center', fontWeight: '600' }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 }, });
