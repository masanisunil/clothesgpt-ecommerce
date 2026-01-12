import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <>
      <h1 className="text-lg font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat label="Total Products" value={stats.total_products} />
        <Stat label="Total Orders" value={stats.total_orders} />
        <Stat label="Revenue" value={`₹${stats.total_revenue}`} />
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white border p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
