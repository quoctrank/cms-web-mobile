import * as React from "react";
import dayjs from "dayjs";
import { TransactionAPI, CategoryAPI, WalletAPI } from "../services/api";
import TransactionForm from "../components/TransactionForm";
export default function Transactions() {
  const [items, setItems] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [wallets, setWallets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const fetchAll = async () => {
    setLoading(true);
    const [tx, cat, wl] = await Promise.all([
      TransactionAPI.list({ populate: "*" }),
      CategoryAPI.list(),
      WalletAPI.list(),
    ]);
    const data = tx.data ?? [];
    setItems(data);
    setCategories(cat.data ?? []);
    setWallets(wl.data ?? []);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchAll();
  }, []);
  const fmt = (n) => n.toLocaleString("vi-VN");
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Giao dịch</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white rounded px-3 py-2"
        >
          Thêm giao dịch
        </button>
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex justify-between border-b pb-2">
              <div>
                <div className="font-medium">
                  {it.category?.name ?? "(Không danh mục)"}
                </div>
                <div className="text-sm text-slate-500">
                  {dayjs(it.booked_at).format("DD/MM/YYYY")} · {it.note}
                </div>
              </div>
              <div
                className={
                  it.type === "expense" ? "text-rose-600" : "text-emerald-600"
                }
              >
                {it.type === "expense" ? "-" : "+"}
                {fmt(it.amount)} VND
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <TransactionForm
          categories={categories}
          wallets={wallets}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchAll();
          }}
        />
      )}
    </div>
  );
}
