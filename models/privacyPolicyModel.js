module.exports = (seq, DT) => {
  const PrivacyPolicy = seq.define(
    "privacy_policy",
    {
      heading: {
        type: DT.TEXT,
        allowNull: false,
      },
      content: {
        type: DT.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return PrivacyPolicy;
};
