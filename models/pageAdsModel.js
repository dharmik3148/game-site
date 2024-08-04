module.exports = (seq, DT) => {
  const PageAds = seq.define(
    "page_ads",
    {
      page_type: {
        type: DT.STRING,
        allowNull: false,
      },
      ad_status: {
        type: DT.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );

  return PageAds;
};
