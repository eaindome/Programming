const { getOngoingSessions } = require('./queries');

// Get all ongoing sessions
const getAllOngoingSessions = async (req, res) => {
  try {
    const ongoingSessions = await getOngoingSessions();
    res.json(ongoingSessions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching ongoing sessions.' });
  }
};

module.exports = {
  getAllOngoingSessions,
};
