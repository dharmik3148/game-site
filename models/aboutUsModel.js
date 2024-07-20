module.exports = (seq, DT) => {
  const AboutUs = seq.define(
    "about_us",
    {
      heading: {
        type: DT.STRING,
        allowNull: false,
      },
      content: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return AboutUs;
};
