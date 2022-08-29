const AsyncStorage = require("@react-native-async-storage/async-storage");

module.exports = {
  getUser: function () {
    try {
      const user = AsyncStorage.getItem("ignis-user");
      if (!user || user === "undefined") return null;
      else return JSON.parse(user);
    } catch (e) {
      // save error
    }
  },

  getToken: function () {
    const token = AsyncStorage.getItem("ignis-token");
    if (!token || token === "undefined") return null;
    else return token;
  },

  setUserSession: async function ({ user, token }) {
    try {
      await AsyncStorage.setItem("ignis-user", JSON.stringify(user));
      await AsyncStorage.setItem("ignis-token", token);
    } catch (e) {
      // save error
    }
  },

  resetUserSession: function () {
    AsyncStorage.removeItem("ignis-user");
    AsyncStorage.removeItem("ignis-token");
  },
};
