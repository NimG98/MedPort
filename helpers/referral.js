const referralCodeLength = 6;

/* Referral Helper Functions */
const generateReferralCode = () => {
	return Math.random().toString(36).substr(2, referralCodeLength).toUpperCase()
};

module.exports = { generateReferralCode };

