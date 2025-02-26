module.exports = (seq, DT) => {
  const Game = seq.define(
    "game",
    {
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      description: {
        type: DT.TEXT("long"),
        allowNull: false,
      },
      thumbnail: {
        type: DT.STRING,
        allowNull: false,
        get() {
          const rawVal = this.getDataValue("thumbnail");
          return rawVal
            ? `${process.env.NEXT_APP_BASE_URL}/api/uploads/thumbnails/${rawVal}`
            : null;
        },
      },
      game_path: {
        type: DT.STRING,
        allowNull: false,
        get() {
          const rawVal = this.getDataValue("game_path");
          return rawVal
            ? `${process.env.NEXT_APP_BASE_URL}/api/uploads/games/${rawVal}/index.html`
            : null;
        },
      },
      game_folder: {
        type: DT.VIRTUAL,
        get() {
          return this.getDataValue("game_path");
        },
      },
      thumbnail_path: {
        type: DT.VIRTUAL,
        get() {
          return this.getDataValue("thumbnail");
        },
      },
      played_count: {
        type: DT.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      ad_status: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      game_status: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      page_title: {
        type: DT.STRING,
        allowNull: false,
      },
      meta_description: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Game;
};
