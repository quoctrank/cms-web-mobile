import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { TransactionAPI } from "../services/api";
import { auth } from "../services/auth";
export default function DashboardScreen({ navigation }) {
  const [summary, setSummary] = React.useState({ income: 0, expense: 0 });
  React.useEffect(() => {
    (async () => {
      await auth.init();
      const tx = await TransactionAPI.list(
        `&filters[booked_at][$gte]=${dayjs()
          .startOf("month")
          .format("YYYY-MM-DD")}`
      );
      const items = tx.data ?? [];
      const income = items
        .filter((i) => i.type === "income")
        .reduce((s, i) => s + i.amount, 0);
      const expense = items
        .filter((i) => i.type === "expense")
        .reduce((s, i) => s + i.amount, 0);
      setSummary({ income, expense });
    })();
  }, []);
  const fmt = (n) => (n || 0).toLocaleString("vi-VN");
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Tổng quan tháng {dayjs().format("MM/YYYY")}
      </Text>
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text>Thu nhập</Text>
          <Text style={{ color: "#059669", fontSize: 18 }}>
            {fmt(summary.income)} VND
          </Text>
        </View>
        <View style={styles.card}>
          <Text>Chi tiêu</Text>
          <Text style={{ color: "#DC2626", fontSize: 18 }}>
            {fmt(summary.expense)} VND
          </Text>
        </View>
      </View>
      <Button
        title="Xem giao dịch"
        onPress={() => navigation.navigate("Transactions")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  heading: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    elevation: 2,
  },
});
