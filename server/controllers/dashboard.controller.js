// backend/controllers/dashboardController.js
import { responseUtil } from '../utils/responseUtil.js';
import { DashboardStats } from '../models/DashboardStats.model.js';


const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the logged-in user ID is in req.user
    const stats = await DashboardStats.findOne({ user: userId });

    if (!stats) {
      return res.status(404).json(responseUtil({ approvedCount: 0, rejectedCount: 0 }, 'No stats found for the user'));
    }

    res.status(200).json(responseUtil(stats, 'Dashboard stats fetched successfully'));
  } catch (error) {
    res.status(400).json(responseUtil(error.message, 'error'));
  }
};

export { getDashboardStats };

