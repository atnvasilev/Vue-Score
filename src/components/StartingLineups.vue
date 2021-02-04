<template>
  <div>
    <div class="data-statistics-lineup-text">Стартови състави</div>
    <table class="data-statistics-lineup__home-team">
      <tbody>
        <tr v-for="(el, index) in homeTeam" :key="index">
          <td class="data-statistics-lineup__home_players">
            <span>{{el.number}}</span>
            <span>.{{el.player}}</span>
            <span v-html="playersDetails(el.player_id)"></span>
            <!-- <div v-html="playersDetails(el.player_id)"></div> -->
          </td>
        </tr>
      </tbody>
    </table>
    <table class="data-statistics-lineup__away-team">
      <tbody style="float:right">
        <tr v-for="(el, index) in awayTeam" :key="index">
          <td class="data-statistics-lineup__away_players">
            <!-- <span v-html="awayPlayersDetails(el.player_id)"></span> -->
            <span style="margin-right:10px;" v-html="awayPlayersDetails(el.player_id)"></span>
            <span style="float:right;">.{{el.number}}</span>
            <span>{{el.player}}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="data-statistics-lineup-text">Резерви</div>
    <table class="data-statistics-lineup__home-team">
      <tbody>
        <tr v-for="(el, index) in homeSubstitutions" :key="index">
          <td class="data-statistics-lineup__home_players">
            <span>{{el.number}}</span>
            <span>.{{el.player}}</span>
            <span class="home-players-subs-in" v-html="playersDetails(el.player_id)"></span>
            <!-- <span v-html="playersDetails(el.player_id)"></span> -->
          </td>
        </tr>
      </tbody>
    </table>
    <table class="data-statistics-lineup__away-team">
      <tbody style="float:right">
        <tr v-for="(el, index) in awaySubstitutions" :key="index">
          <td class="data-statistics-lineup__away_players">
            <!-- <span v-html="awayPlayersDetails(el.player_id)"></span> -->
            <span v-html="awayPlayersDetails(el.player_id)"></span>
            <span style="float:right;">.{{el.number}}</span>
            <span style="margin-left: 10px;">{{el.player}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    homeTeam: {
      required: true
    },
    awayTeam: {
      required: true
    },
    homeSubstitutions: {
      type: Array,
      required: true
    },
    awaySubstitutions: {
      type: Array,
      required: true
    },
    events: {
      required: true
    }
  },

  methods: {
    playersDetails(playerID) {
      let events = this.events.events;
      let html = "";
      for (let key of events) {
        if (key.player_id == playerID) {
          if (key.type == "Goal") {
            html += '<span class="goal home-players-details"></span>';
          } else if (key.detail == "Yellow Card") {
            html += '<span class="yellow-card home-players-details"></span>';
          } else if (key.detail == "Red Card") {
            html += '<span class="red-card home-players-details"><span>';
          }
        }
      }
      for (let key of events) {
        if (key.type == "subst") {
          if (key.assist_id == playerID) {
            html += '<span class="subst-player-out home-players-details"></span><span class="subs-players">( '+key.player+' )</span>';
          }else if(key.player_id == playerID){
            html += '<span class="subst-player-in home-players-details"></span><span class="subs-players">( '+key.assist+' )</span>';
          }
        }
      }
      return html;
    },
    awayPlayersDetails(playerID) {
      let events = this.events.events;
      let html = "";
      for (let key of events) {
        if (key.player_id == playerID) {
            if (key.type == "Goal") {
            html += '<span class="goal away-players-details"></span>';
          } else if (key.detail == "Yellow Card") {
            html += '<span class="yellow-card away-players-details"></span>';
          } else if (key.detail == "Red Card") {
            html += '<span class="red-card away-players-details"><span>';
          }
        }
      }
      for (let key of events) {
        if (key.type == "subst") {
          if (key.assist_id == playerID) {
            html += '</span><span class="subs-players">( '+key.player+' )</span><span class="subst-player-out home-players-details">';
           // html += '<span class="subst-player-out home-players-details"></span><span class="subs-players">'+key.player+'</span><span class="subst-player-in home-players-details">';
          }else if(key.player_id == playerID){
            html += '<span class="subs-players">( '+key.assist+' )</span><span class="subst-player-in home-players-details"></span>';
          }
        }
      }
      return html;
    }
  }
};
</script>

<style>
.yellow-card {
  width: 15px;
  height: 20px;
  background: #ffa600;
  display: inline-block;
  position: relative;
  top: 5px;
}
.goal {
  background: url(../assets/football_ball.png) no-repeat;
  background-size: 20px;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
  top: 5px;
}
.home-players-details {
  left: 10px;
}
.away-players-details {
  right: 10px;
}
.subs-players{
    position: relative;
    left:10px;
}
.subst-player-out {
  background: url(../assets/down-arrow.png) no-repeat;
  background-size: 18px;
  width: 18px;
  height: 18px;
  display: inline-block;
  position: relative;
  top: 3px;
}
.subst-player-in {
  background: url(../assets/up-arrow.png) no-repeat;
  background-size: 18px;
  width: 18px;
  height: 18px;
  display: inline-block;
  position: relative;
  top: 2px;
}
.home-players-subs-in {
  position:relative;
  right: 10px;
}
</style>