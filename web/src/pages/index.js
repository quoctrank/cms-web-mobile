
import * as React from 'react';
import { auth } from '../services/auth';
import { navigate } from 'gatsby';
export default function LoginPage() {
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const onSubmit = async (e) => { e.preventDefault(); setError(''); try { await auth.login(identifier, password); navigate('/app'); } catch (err) { setError('Đăng nhập thất bại. Kiểm tra email/mật khẩu hoặc quyền.'); } };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Quản lý chi tiêu</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full border rounded p-2" placeholder="Email hoặc username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
          <input className="w-full border rounded p-2" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
