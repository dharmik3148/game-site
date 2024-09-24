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
            ? `${process.env.NEXT_APP_BASE_URL}/api/uploads/gametype/${rawVal}`
            : null;
        },
      },
      img_path: {
        type: DT.VIRTUAL,
        get() {
          return this.getDataValue("type_img");
        },
      },
    },
    { timestamps: false }
  );

  return GameType;
};
