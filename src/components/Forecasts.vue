<template>
  <div class="schedules-container">
    <div v-for="(round, index) in schedules" :key="index" class="round-container">
      <div class="round-number">{{'Round - '+index.slice(index.lastIndexOf('-') + 1)}}</div>

      <a v-for="(elem, elKey) in round" :key="elKey" class="single-row-round">
        <!-- <router-link :to="{name: 'Statistics', params: {id: elem.fixture_id }}" tag="a" class="single-row-round"> -->
          <div
            class="flex-row round-time"
          >{{elem["event_date"].slice(0, elem["event_date"].lastIndexOf('-')+3)}}</div>
          <div class="flex-row homeTeam">{{elem["homeTeam"].team_name}}</div>
          <div class="flex-row forecast-separator">
            <input type="number" class="forecast-goals">-<input type="number" class="forecast-goals">
          </div>
          <div class="flex-row awayTeam">{{elem["awayTeam"].team_name}}</div>
        <!-- </router-link> -->
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schedules: {
      required: true
    }
  },
    beforeCreate() {
    fetch(
      "https://apiv2.apifootball.com/?action=get_events&from=2019-08-09&to=2020-12-31&league_id=148&APIkey=4fe68f2c425088b321d90b1325cabe2da79209df56b7c1c32b9d2f825ede4d21"
    )
      .then(response => response.json())
      .then(data => {
        this.matches = data;
      })
      .then(() => this.$emit("ready"));
  }
};
</script>

<style>
.forecast-goals{
    width: 20px;
    height: 20px;
    padding: 0px 5px 0px 5px;
    margin: 0px 10px;
}
.forecast-separator{
    width: 80px;
    padding: 0.5rem;
    font-weight: bold;
    margin: 0px 10px;
}
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>