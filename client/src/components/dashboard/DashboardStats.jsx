// src/components/dashboard/DashboardStats.jsx
const DashboardStats = ({ approvedCount, rejectedCount }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Dashboard Statistics</h2>
      <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium">Approved Blogs</h3>
              <p className="text-2xl font-bold">{approvedCount}</p>
          </div>
          <div className="bg-red-200 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium">Rejected Blogs</h3>
              <p className="text-2xl font-bold">{rejectedCount}</p>
          </div>
      </div>
  </div>
);

export default DashboardStats;
