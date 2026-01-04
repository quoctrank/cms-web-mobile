import * as React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import dayjs from "dayjs";
import { TransactionAPI, CategoryAPI, WalletAPI } from "../services/api";
import { Picker } from "@react-native-picker/picker";
export default function AddTransactionScreen({ navigation, route }) {
  const [type, setType] = React.useState("expense");
  const [amount, setAmount] = React.useState("");
  const [bookedAt, setBookedAt] = React.useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [wallets, setWallets] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [walletId, setWalletId] = React.useState("");
  React.useEffect(() => {
    (async () => {
      const cat = await CategoryAPI.list();
      setCategories(cat.data ?? []);
      const wl = await WalletAPI.list();
      setWallets(wl.data ?? []);
    })();
  }, []);
  const onSave = async () => {
    try {
      const payload = {
        type,
        amount: parseInt(amount || "0", 10),
        booked_at: bookedAt,
        note,
        category: categoryId ? Number(categoryId) : null,
        wallet: walletId ? Number(walletId) : null,
      };
      await TransactionAPI.create(payload);
      Alert.alert("Thành công", "Đã lưu giao dịch");
      const onSaved = route?.params?.onSaved;
      if (onSaved) onSaved();
      navigation.goBack();
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu giao dịch");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm giao dịch</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Picker selectedValue={type} onValueChange={(v) => setType(v)}>
          <Picker.Item label="Chi tiêu" value="expense" />
          <Picker.Item label="Thu nhập" value="income" />
          <Picker.Item label="Chuyển khoản" value="transfer" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Số tiền (VND)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày (YYYY-MM-DD)"
        value={bookedAt}
        onChangeText={setBookedAt}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Picker selectedValue={walletId} onValueChange={(v) => setWalletId(v)}>
          <Picker.Item label="-- Ví --" value="" />
          {wallets.map((w) => (
            <Picker.Item key={w.id} label={w.name} value={w.id} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Picker
          selectedValue={categoryId}
          onValueChange={(v) => setCategoryId(v)}
        >
          <Picker.Item label="-- Danh mục --" value="" />
          {categories
            .filter(
              (c) => c.kind === (type === "income" ? "income" : "expense")
            )
            .map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
        </Picker>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="Ghi chú"
        value={note}
        onChangeText={setNote}
        multiline
        numberOfLines={3}
      />
      <Button title="Lưu" onPress={onSave} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 60,
  },
});
