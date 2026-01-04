import * as React from "react";
import dayjs from "dayjs";
import { TransactionAPI } from "../services/api";
export default function TransactionForm({
  categories,
  wallets,
  onClose,
  onSaved,
}) {
  const [type, setType] = React.useState("expense");
  const [amount, setAmount] = React.useState("");
  const [bookedAt, setBookedAt] = React.useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [walletId, setWalletId] = React.useState("");
  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      type,
      amount: parseInt(amount || "0", 10),
      booked_at: bookedAt,
      note,
      category: categoryId ? Number(categoryId) : null,
      wallet: walletId ? Number(walletId) : null,
    };
    await TransactionAPI.create(payload);
    onSaved?.();
  };
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h4 className="text-lg font-semibold mb-4">Thêm giao dịch</h4>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select
              className="border rounded p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Chi tiêu</option>
              <option value="income">Thu nhập</option>
              <option value="transfer">Chuyển khoản</option>
            </select>
            <input
              className="border rounded p-2"
              type="number"
              placeholder="Số tiền (VND)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="border rounded p-2"
              type="date"
              value={bookedAt}
              onChange={(e) => setBookedAt(e.target.value)}
            />
            <select
              className="border rounded p-2"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
            >
              <option value="">-- Ví --</option>
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="border rounded p-2"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">-- Danh mục --</option>
              {categories
                .filter(
                  (c) => c.kind === (type === "income" ? "income" : "expense")
                )
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            <textarea
              className="border rounded p-2"
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border rounded px-3 py-2"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-3 py-2"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
