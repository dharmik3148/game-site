module.exports = (seq, DT) => {
  const Ad = seq.define(
    "ad",
    {
      ad_name: {
        type: DT.STRING,
        allowNull: false,
      },
      ad_client: {
        type: DT.STRING,
        allowNull: false,
      },
      ad_slot: {
        type: DT.STRING,
        allowNull: false,
      },
      ad_format: {
        type: DT.STRING,
        allowNull: false,
      },
      ad_fullWidthResponsive: {
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
