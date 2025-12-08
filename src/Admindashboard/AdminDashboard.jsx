import React, { useState, useMemo } from "react";
import {
  Search, Filter, MoreVertical, Edit, Ban, Mail, Key,
  Download, RefreshCw, ChevronDown, Plus, TrendingUp,
  DollarSign, Activity, AlertTriangle, Building, UserCheck
} from "lucide-react";

import StatCard from "./StatCard";
import UserModal from "./UserModal";
import UserRow from "./UserRow";
import SystemHealth from "./SystemHealth";
import RecentActivityList from "./RecentActivityList";

const PALETTE = ["#75B7FF", "#D5A8FF", "#FF9BAD", "#FFD1A3", "#10b981"];

const AdminDashboard = () => {
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Table state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Modal
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock users
  const users = [
    { id: 1, company: "Acme Corp", email: "admin@acme.com", plan: "Enterprise", status: "active", apiCalls: 145000, apiLimit: 200000, monthlySpend: 499, lastActive: "2 hours ago", joined: "Jan 15, 2024", detected: 12400, users: 15, avatar: "AC" },
    { id: 2, company: "TechStart Inc", email: "contact@techstart.io", plan: "Pro", status: "active", apiCalls: 48000, apiLimit: 100000, monthlySpend: 199, lastActive: "5 hours ago", joined: "Feb 3, 2024", detected: 8900, users: 8, avatar: "TS" },
    { id: 3, company: "DataFlow Solutions", email: "admin@dataflow.com", plan: "Starter", status: "trial", apiCalls: 12000, apiLimit: 25000, monthlySpend: 0, lastActive: "1 day ago", joined: "Mar 10, 2024", detected: 2100, users: 3, avatar: "DF" },
    { id: 4, company: "SecureAuth Ltd", email: "security@secureauth.net", plan: "Enterprise", status: "active", apiCalls: 89000, apiLimit: 200000, monthlySpend: 499, lastActive: "30 min ago", joined: "Dec 1, 2023", detected: 15600, users: 25, avatar: "SA" },
    { id: 5, company: "CloudBase", email: "ops@cloudbase.com", plan: "Pro", status: "suspended", apiCalls: 0, apiLimit: 100000, monthlySpend: 0, lastActive: "2 weeks ago", joined: "Jan 20, 2024", detected: 0, users: 5, avatar: "CB" },
    { id: 6, company: "FinTech Pro", email: "admin@fintechpro.com", plan: "Enterprise", status: "active", apiCalls: 178000, apiLimit: 200000, monthlySpend: 499, lastActive: "1 hour ago", joined: "Nov 15, 2023", detected: 19800, users: 42, avatar: "FP" },
  ];

  const stats = [
    { title: "Total Companies", value: "1,247", change: "+12.5%", icon: Building, color: PALETTE[0] },
    { title: "Active Users", value: "3,892", change: "+8.2%", icon: UserCheck, color: PALETTE[4] },
    { title: "Monthly Revenue", value: "$89,420", change: "+23.1%", icon: DollarSign, color: PALETTE[1] },
    { title: "Total API Calls", value: "12.4M", change: "+15.7%", icon: Activity, color: PALETTE[3] },
  ];

  const activity = [
    { type: "New Signup", company: "DevOps Inc", time: "5 min ago", icon: Plus, color: PALETTE[4] },
    { type: "Plan Upgrade", company: "Acme Corp", time: "1 hour ago", icon: TrendingUp, color: PALETTE[0] },
    { type: "Payment Received", company: "SecureAuth Ltd", time: "2 hours ago", icon: DollarSign, color: PALETTE[1] },
    { type: "API Limit Warning", company: "FinTech Pro", time: "3 hours ago", icon: AlertTriangle, color: PALETTE[3] },
    { type: "Account Suspended", company: "CloudBase", time: "1 day ago", icon: Ban, color: PALETTE[2] },
  ];

  // Filtering & search logic
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) =>
        u.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((u) => (filterStatus === "all" ? true : u.status === filterStatus))
      .filter((u) => (filterPlan === "all" ? true : u.plan.toLowerCase() === filterPlan));
  }, [searchTerm, filterStatus, filterPlan]);

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Selection
  const toggleSelectOne = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#f0f9ff]">

      {/* Header */}
      <header className="bg-white border-b px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 via-red-500 to-orange-400">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Manage companies, users, and system metrics</p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl border font-medium flex items-center gap-2">
              <Download size={16} /> Export
            </button>
            <button className="px-6 py-2 rounded-xl bg-black text-white flex items-center gap-2">
              <Plus size={16} /> Add Company
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Area */}
        <div className="col-span-2 space-y-6">

          {/* Search & Filters */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3 text-gray-500" size={18} />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-xl border"
                  placeholder="Search company or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                className="px-4 py-3 rounded-xl border flex items-center gap-2"
                onClick={() => setShowFilters((v) => !v)}
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} className={`${showFilters && "rotate-180"} transition`} />
              </button>
            </div>

            {showFilters && (
              <div className="grid sm:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                {/* Status */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-xl border"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="suspended">Suspended</option>
                </select>

                {/* Plans */}
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="px-4 py-2 rounded-xl border"
                >
                  <option value="all">All Plans</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="pro">Pro</option>
                  <option value="starter">Starter</option>
                </select>

                {/* Reset */}
                <button className="px-4 py-2 rounded-xl border flex items-center gap-2">
                  <RefreshCw size={16} /> Reset
                </button>
              </div>
            )}
          </section>

          {/* Users Table */}
          <section className="bg-white rounded-2xl border shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedUsers.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left text-gray-500 text-sm">Company</th>
                  <th className="p-4 text-left text-gray-500 text-sm">Plan</th>
                  <th className="p-4 text-left text-gray-500 text-sm">Status</th>
                  <th className="p-4 text-left text-gray-500 text-sm">API Usage</th>
                  <th className="p-4 text-left text-gray-500 text-sm">Revenue</th>
                  <th className="p-4 text-left text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.map((user, index) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={index}
                    palette={PALETTE}
                    selected={selectedUsers.includes(user.id)}
                    onSelect={() => toggleSelectOne(user.id)}
                    onOpen={() => setSelectedUser(user)}
                  />
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t">
              <p className="text-sm text-gray-500">
                Showing {paginatedUsers.length} of {filteredUsers.length}
              </p>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RecentActivityList activity={activity} palette={PALETTE} />
          <SystemHealth palette={PALETTE} />
        </div>
      </main>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
