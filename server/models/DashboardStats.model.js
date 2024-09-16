import mongoose from 'mongoose';

const dashboardStatsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    approvedCount: { type: Number, default: 0 },
    rejectedCount: { type: Number, default: 0 }
});

export const DashboardStats = mongoose.model('DashboardStats', dashboardStatsSchema);
