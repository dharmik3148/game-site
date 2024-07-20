module.exports = (seq, DT) => {
  const PrivacyPolicy = seq.define(
    "privacy_policy",
    {
      heading: {
        type: DT.STRING,
        allowNull: false,
      },
      content: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return PrivacyPolicy;
};
