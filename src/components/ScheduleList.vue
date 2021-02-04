<template>
  <div class="schedules-container">
    <div v-for="(round, index) in schedules" :key="index" class="round-container">
      <div class="round-number">{{'Round - '+index.slice(index.lastIndexOf('-') + 1)}}</div>

      <a v-for="(elem, elKey) in round" :key="elKey">
        <router-link :to="{name: 'Statistics', params: {id: elem.fixture_id }}" tag="a" class="single-row-round">
          <div
            class="flex-row round-time"
          >{{elem["event_date"].slice(0, elem["event_date"].lastIndexOf('-')+3)}}</div>
          <div class="flex-row homeTeam">{{elem["homeTeam"].team_name}}</div>
          <div class="flex-row teams-separator">
            <span class="homeTeamGoals">{{elem["goalsHomeTeam"]}}</span>-
            <span class="awayTeamGoals">{{elem["goalsAwayTeam"]}}</span>
          </div>
          <div class="flex-row awayTeam">{{elem["awayTeam"].team_name}}</div>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schedules: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.home__team-score {
  margin-left: 5px;
}
.search__team {
  width: 100%;
  opacity: 0.64;
  border-radius: 10px;
  height: 30px;
  outline: none;
  border-color: rgba(0, 0, 0, 0.12);
  padding-left: 10px;
}
.schedule__day-match {
  display: inline-block;
  text-align: right;
  width: 250px;
}
.schedule__day-match-away {
  display: inline-block;
  text-align: left;
  width: 250px;
  position: relative;
  left: 10px;
}
.schedyle__result-away {
  padding-left: 5px;
}

.schedule__result-score {
  font-weight: 700;
  display: inline-block;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 100%;
  background: #3498db;
  color: #fff;
}
.homeTeamGoals {
  padding-right: 5px;
}
.awayTeamGoals {
  padding-left: 5px;
}
.round-container {
  background: #004467;
  color: white;
  border-color: #004467;
  border-top: solid 1px #f1f1f1;
  height: initial;
}
.round-number {
  padding: 0.5rem;
  font-weight: bold;
  text-align: left;
}
.schedules-container {
  width: 1200px;
  margin: 0 auto;
}
.single-row-round {
  color: black;
  text-decoration: none;
  font-weight: lighter;
  display: flex;
  border-bottom: 1px solid white;
  background-color: #f4f2f1;
}
a.single-row-round:hover {
  color: white;
  background-color: #0088cc;
  width:100%;
}
.round-time {
  justify-content: space-around;
  width: 100px;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.flex-row {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  overflow: hidden;
}
.homeTeam {
  justify-content: flex-end;
  text-align: right;
  flex: 1;
}
.teams-separator {
  padding: 0.5rem;
  font-weight: bold;
  width: 50px;
}
.awayTeam {
  justify-content: flex-start;
  flex: 1;
}
</style>

