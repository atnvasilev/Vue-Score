export default {
    authUser (state) {
      return state.authId ? state.users[state.authId] : null
    },
    getSchedule(state) {
      return state.schedule
    }
  }