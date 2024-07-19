module.exports = (seq, DT) => {
  const User = seq.define(
    "user",
    {
      username: {
        type: DT.STRING,
        allowNull: false,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};
