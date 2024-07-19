module.exports = (seq, DT) => {
  const GameType = seq.define(
    "game_type",
    {
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      type_img: {
        type: DT.STRING,
        allowNull: false,
        get() {
          const rawVal = this.getDataValue("type_img");
          return rawVal
            ? `${process.env.NEXT_APP_BASE_URL}/uploads/gametype/${rawVal}`
            : null;
        },
      },
    },
    { timestamps: false }
  );

  return GameType;
};
