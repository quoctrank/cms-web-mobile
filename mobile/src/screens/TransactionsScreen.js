import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { TransactionAPI } from "../services/api";
import { auth } from "../services/auth";
export default function TransactionsScreen({ navigation }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const fetchAll = async () => {
    setLoading(true);
    await auth.init();
    const tx = await TransactionAPI.list("&populate=*");
    const data = tx.data ?? [];
    setItems(data);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchAll();
  }, []);
  const fmt = (n) => (n || 0).toLocaleString("vi-VN");
  return (
    <View style={styles.container}>
      <Button
        title="Thêm giao dịch"
        onPress={() =>
          navigation.navigate("AddTransaction", { onSaved: fetchAll })
        }
      />
      {loading ? (
        <Text>Đang tải...</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500" }}>
                  {item?.category?.name ?? "(Không danh mục)"}
                </Text>
                <Text style={{ color: "#64748B" }}>
                  {dayjs(item.booked_at).format("DD/MM/YYYY")} · {item.note}
                </Text>
              </View>
              <Text
                style={{
                  color: item.type === "expense" ? "#DC2626" : "#059669",
                }}
              >
                {item.type === "expense" ? "-" : "+"}
                {fmt(item.amount)} VND
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
