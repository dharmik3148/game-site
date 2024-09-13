const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.NEXT_APP_DBNAME,
  process.env.NEXT_APP_USERNAME,
  process.env.NEXT_APP_PASSWORD,
  {
    host: process.env.NEXT_APP_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB CONNECTED !!");
  })
  .catch((err) => console.log(`Error - ${err}`));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("@/models/userModel")(sequelize, DataTypes);
db.userSessions = require("@/models/userSessions")(sequelize, DataTypes);
db.ad = require("@/models/adsModel")(sequelize, DataTypes);
db.category = require("@/models/categoryModel")(sequelize, DataTypes);
db.game_type = require("@/models/gametypeModel")(sequelize, DataTypes);
db.game = require("@/models/gameModel")(sequelize, DataTypes);
db.privacypolicy = require("@/models/privacyPolicyModel")(sequelize, DataTypes);
db.aboutus = require("@/models/aboutUsModel")(sequelize, DataTypes);
db.pageads = require("@/models/pageAdsModel")(sequelize, DataTypes);

// ASSOCIATIONS START

db.user.hasMany(db.userSessions, { foreignKey: "userId" });
db.userSessions.belongsTo(db.user, { foreignKey: "userId" });

db.ad.hasMany(db.game, { foreignKey: "adId", onDelete: "RESTRICT" });
db.game.belongsTo(db.ad, { foreignKey: "adId" });

db.category.hasMany(db.game, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
});
db.game.belongsTo(db.category, { foreignKey: "categoryId" });

db.game_type.hasMany(db.game, {
  foreignKey: "game_typeId",
  onDelete: "RESTRICT",
});
db.game.belongsTo(db.game_type, { foreignKey: "game_typeId" });

db.ad.hasMany(db.pageads, { foreignKey: "adId", onDelete: "RESTRICT" });
db.pageads.belongsTo(db.ad, { foreignKey: "adId" });

// ASSOCIATIONS END

db.sequelize.sync({ force: false }).then(() => {
  console.log("### RESYNCED ###");
});

module.exports = db;
