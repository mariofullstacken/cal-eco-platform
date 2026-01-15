const userModel = require('../models/user.model');

const toUserProfile = (user) => ({
  id: user.id,
  address: user.address,
  tokenBalance: user.token_balance,
  mbusdBalance: user.MBUSD_balance,
  referralCode: user.referral_code,
  firstName: user.first_name || '',
  lastName: user.last_name || '',
  username: user.username || '',
  intro: user.intro || '',
});

const getUserByAddress = async (address) => {
  const users = await userModel.getUsersAddress({ address });
  if (!users || users.length === 0) {
    return null;
  }
  return users[0];
};

const getUserProfileByAddress = async (address) => {
  const user = await getUserByAddress(address);
  return user ? toUserProfile(user) : null;
};

const updateUserProfile = async (address, updates) => {
  await userModel.updateUserProfile({
    address,
    first_name: updates.firstName,
    last_name: updates.lastName,
    username: updates.username,
    intro: updates.intro,
  });

  return getUserProfileByAddress(address);
};

const isUsernameTaken = async (username, currentUserId = null) => {
  const users = await userModel.getUserByUsername({ username });
  if (!users || users.length === 0) {
    return false;
  }

  const user = users[0];
  if (currentUserId && user.id === currentUserId) {
    return false;
  }

  return true;
};

module.exports = {
  getUserProfileByAddress,
  updateUserProfile,
  isUsernameTaken,
};
