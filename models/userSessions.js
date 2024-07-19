module.exports = (seq, DT) => {
  const UserSession = seq.define(
    "user_session",
    {
      userId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      token: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return UserSession;
};
