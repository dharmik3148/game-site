module.exports = (seq, DT) => {
  const Category = seq.define(
    "category",
    {
      category_name: {
        type: DT.STRING,
        allowNull: false,
      },
      category_img: {
        type: DT.STRING,
        allowNull: false,
        get() {
          const rawVal = this.getDataValue("category_img");
          return rawVal
            ? `${process.env.NEXT_APP_BASE_URL}/uploads/category/${rawVal}`
            : null;
        },
      },
      img_path: {
        type: DT.VIRTUAL,
        get() {
          return this.getDataValue("category_img");
        },
      },
    },
    { timestamps: false }
  );

  return Category;
};
