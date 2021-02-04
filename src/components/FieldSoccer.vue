<template>
  <div class="lineupField">
    <div class="fieldSoccer">
      <div class="homeTeam-container">
        <div class="players" v-for="(el, index) in homePlayersPositionInField()" :key="index">
          <div v-for="(key, indexPos) in el" :key="indexPos" :title="key.player" class="playersPosition-container">
            <div v-html="playersDetails(key.player_id)"></div>
            <div class="lineup-tshirt home">
              <span class="player-number">{{key.number}}</span>
            </div>
            <div>
              <span class="player-name" >{{key.player}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="awayTeam-container">
        <div class="players" v-for="(el, index) in awayPlayersPositionInField()" :key="index">
          <div v-for="(key, indexPos) in el" :key="indexPos" :title="key.player" class="playersPosition-container">
            <div v-html="playersDetails(key.player_id)"></div>
            <div class="lineup-tshirt away">
              <span class="player-number-away">{{key.number}}</span>
            </div>
            <div>
              <span class="player-name" >{{key.player}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    homeTeamData: {
      required: true
    },
    awayTeamData: {
      required: true
    }
  },
  methods: {
    groupBy(array, key) {
      const result = {};
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });

      return result;
    },

    homePlayersPositionInField() {
      let data = this.homeTeamData;
      let playerPosition = this.groupBy(data, "pos");
      return playerPosition;
    },
    awayPlayersPositionInField() {
      let data = this.awayTeamData;
      let playerPosition = this.groupBy(data, "pos");
      let awayPlayer = this.reverseObject(playerPosition);

      return awayPlayer;
    },

    reverseObject(object) {
      var newObject = {};
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]] = value;
      }

      return newObject;
    },
    playersDetails(playerID) {
      let playersDetails = this.$store.state.matchEvents.events;
      let html = '';
      for (let key of playersDetails) {
        if (key.player_id == playerID) {
          if (key.type == "Goal") {
            html += "<span class='player-goal'></span>";
          } else if (key.detail == "Yellow Card") {
            html += "<span class='player-card yellowCard'></span>";
          } else if (key.detail == "Red Card") {
            html += "<span class='player-card redCard'></span>";
          } else if (key.type == "subst") {
            html += "<span class='player-card subst'></span>";
          }
        }
      }
      return html;
    }
  }
};
</script>

<style>
.lineupField {
  width: 550px;
  background-color: #008000;
  margin-top: 0px;
  border-bottom: 1px solid #bcbeae;
  overflow: auto;
  margin: 0 auto;
  margin-bottom: 15px;
}
.fieldSoccer {
  position: relative;
  width: 540px;
  height: 320px;
  background: url(../assets/field_soccer_.gif) no-repeat #008000;
  overflow: hidden;
  margin: 0 auto;
}
.yellowCard {
  background: #ffa600;
}
.subst{
  background: url(../assets/down-arrow.png) no-repeat;
  background-size: 16px;
  width: 16px !important;
  height: 14px !important;
}
.player-card {
  width: 10px;
  height: 15px;
  display: inline-block;
  position: relative;
  right: 10px;
}
.playersPosition-container {
  justify-content: center;
  align-items: center;
}
.details-player {
  width: 40px;
}
.player-goal {
  background: url(../assets/football_ball.png) no-repeat;
  background-size: 16px;
  width: 16px;
  height: 16px;
  display: inline-block;
  position: relative;
  right: 10px;
  top: 5px;
}
.homeTeam-container {
  width: 270px;
  height: 320px;
  float: left;
  position: relative;
  display: flex;
}
.awayTeam-container {
  width: 270px;
  height: 320px;
  display: flex;
  float: right;
}
.players {
  max-width: 67px;
  word-break: break-all;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 67px;
}
.lineup-tshirt {
  height: 28px;
  width: 28px;
  display: inline-block;
}
.home {
  background: url(../assets/home-shirt-32.png) no-repeat;
  background-size: 28px;
}
.away {
  background: url(../assets/away-shirt-32.png) no-repeat;
  background-size: 28px;
}
.player-name {
  font-weight: bold;
  color: #fff;
  position: relative;
  font-size: 11px;
  display: block;
  width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.player-number {
  font-weight: bold;
  top: 7px;
  position: relative;
  font-size: 13px;
}
.player-number-away {
  font-weight: bold;
  top: 7px;
  position: relative;
  font-size: 15px;
  color: #fff;
}
</style>