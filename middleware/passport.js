const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (userName, password, done) => {
  try {
    const user = await User.findOne({
      where: { userName }, // equivalent to { username : username }
    });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});
