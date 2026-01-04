import * as React from "react";
import dayjs from "dayjs";
import { TransactionAPI, WalletAPI, CategoryAPI } from "../services/api";
import Transactions from "./Transactions";
export default function Dashboard() {
  const [summary, setSummary] = React.useState({ income: 0, expense: 0 });
  React.useEffect(() => {
    (async () => {
      const tx = await TransactionAPI.list({
        "filters[booked_at][$gte]": dayjs()
          .startOf("month")
          .format("YYYY-MM-DD"),
      });
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
  const currency = "VND";
  const fmt = (n) => n.toLocaleString("vi-VN");
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Tổng quan tháng {dayjs().format("MM/YYYY")}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-slate-500">Thu nhập</div>
          <div className="text-2xl font-bold text-emerald-600">
            {fmt(summary.income)} {currency}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-slate-500">Chi tiêu</div>
          <div className="text-2xl font-bold text-rose-600">
            {fmt(summary.expense)} {currency}
          </div>
        </div>
      </div>
      <Transactions />
    </div>
  );
}
