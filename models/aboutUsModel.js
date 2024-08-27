module.exports = (seq, DT) => {
  const AboutUs = seq.define(
    "about_us",
    {
      heading: {
        type: DT.STRING,
        allowNull: false,
      },
      content: {
        type: DT.TEXT("long"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return AboutUs;
};
