module.exports = (seq, DT) => {
  const Game = seq.define(
    "game",
    {
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      description: {
        type: DT.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DT.STRING,
        allowNull: false,
      },
      game_path: {
        type: DT.STRING,
        allowNull: false,
      },
      played_count: {
        type: DT.INTEGER,
        allowNull: false,
      },
      ad_status: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: true }
  );

  return Game;
};
