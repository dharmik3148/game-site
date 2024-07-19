module.exports = (seq, DT) => {
  const Ad = seq.define(
    "ad",
    {
      ad_name: {
        type: DT.STRING,
        allowNull: false,
      },
      ad_script: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Ad;
};
