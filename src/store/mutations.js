import Vue from "vue";

export default {
  setItem(state, { item, id, resource }) {
    item[".key"] = id;
    Vue.set(state[resource], id, item);
  },

  setUser(state, { userId, user }) {
    Vue.set(state.users, userId, user);
  },

  setAuthId(state, id) {
    state.authId = id;
  },

  setUnsubscribeAuthObserver(state, unsubscribe) {
    state.unsubscribeAuthObserver = unsubscribe;
  },
  setSchedule(state, data) {
    state.schedule = data
  },
  setRanking(state, data) {
    state.ranking = data
  },
  setOdds(state, data){
    state.odds = data;
  }
};
