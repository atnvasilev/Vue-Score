<template>
  <div class="schedule container container--tall container--max-width">
    <div class="filters">
      <ul class="radio-list">
        <li @click="activate(1)" class="radio-list__item" :class="{active:active_el == 1}">
          <a @click="showFinishedMatches = false,forecast = false" class="radio-list__link">Предстоящи</a>
        </li>
        <!-- <li @click="activate(2)" class="radio-list__item" :class="{active:active_el == 2}">
          <a @click="showFinishedMatches = false, forecast = true" class="radio-list__link">Прогнози</a>
        </li> -->

        <li @click="activate(3)" class="radio-list__item" :class="{active:active_el == 3}">
          <a @click="showFinishedMatches = true, forecast = false" class="radio-list__link">Изминали</a>
        </li>
      </ul>
    </div>
    <ScheduleList :schedules="forthcomingMatches" v-if="!showFinishedMatches && !forecast" />
    <ScheduleList class="schedule-finished" :schedules="finishedMatches" v-else-if="showFinishedMatches && !forecast" />
    <Forecasts :schedules="forthcomingMatches" v-else />
  </div>
</template>

<script>
import ScheduleList from "@/components/ScheduleList";
import Forecasts from "@/components/Forecasts";

export default {
  components: {
    ScheduleList,
    Forecasts
  },
  data() {
    return {
      teams: [],
      showFinishedMatches: false,
      forecast: false,
      active_el: 1,
      searchItem: "",
      result: []
    };
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
    activate:function(el){
        this.active_el = el;
    }
  },
  computed: {

    finishedMatches() {
      let finished = this.matches.filter(item => {
        return item.status === "Match Finished";
      });
      finished = [...finished.reverse()]
      return this.groupBy(finished, "round");
    },

    forthcomingMatches() {
      let forthcoming = this.matches.filter(item => {
        return item.status !== "Match Finished";
      });
      let forthcomingRounds = this.groupBy(forthcoming, "round");
      return forthcomingRounds
    },
    matches() {
      const matches = this.$store.getters.getSchedule;
      if(matches.length > 0) {
        this.$root.$emit("dataReady");
      }

      return matches;
    }
  },
  beforeCreate() {
    this.$store.dispatch("getSchedule");
    // fetch(
    //   "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/2790",
    //   {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    //       "x-rapidapi-key": "48c5cfd3d6msha92bc85ca7a47abp178e66jsn450b9742e064"
    //     }
    //   }
    // )
    // .then(response => {
    //   let data = response.json();
    //   data.then(data => {
    //     this.matches = data["api"]["fixtures"];
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // })
    // .then(() => this.$emit("ready"));
  }
};
</script>

<style>
.filters {
  text-align: center;
  margin-bottom: 24px;
}

.radio-list {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flex;
  display: -o-inline-flex;
  display: inline-flex;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 30px;
  overflow: hidden;
  background: #fff;
}

.radio-list__link {
  text-transform: uppercase;
  text-decoration: none;
  display: block;
  padding: 12px 24px;
  color: #3498db;
  cursor: pointer;
}
.schedule-finished{
  cursor: pointer;
}
.radio-list__item + .radio-list__item {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
.active a{
   color: #fff;
}
.active{
 background: #3498db;
}
.schedule_day {
  font-weight: 700;
  padding-bottom: 12px;
  font-size: 16px;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.12); */
  text-transform: uppercase;
}

.schedule__day-title {
  font-weight: 700;
  padding-bottom: 12px;
  font-size: 16px;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.12); */
  text-transform: uppercase;
}
.schedule__day-title:hover {
    background-color: rgba(0,0,0,.03);
}
.match__time {
    display: inline-block;
    width: 100%;
    text-align: left;
    position: relative;
    top: 23px;
    opacity: .64;
    font-weight: 100;
}

.match__date {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 18px;
  border-bottom: 2px solid rgba(0,0,0,.12);
  opacity: .75;
  padding:10px 0px 10px 0px;
}

.schedule__day-matches {
  width: 500px;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
  position: relative;
}
</style>
