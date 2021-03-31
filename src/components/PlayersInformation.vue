<template>
  <div>
    <div class="data-team__container">
      <div class="data-team__headings_name">
        <div class="team_info_name">Име</div>
      </div>
      <div class="data-team__headings">
        <div class="team_info_age">Години</div>
      </div>
      <div class="data-team__headings">
        <div class="team_info_nationality">Държава</div>
      </div>
      <div class="data-team__headings tshirt" title="Мачове">
        <img src="../assets/tshirt.png" />
      </div>
      <div class="data-team__headings football-ball" title="Голове">
        <img src="../assets/goal.png" />
      </div>
      <div class="data-team__headings football-ball" title="Асистенции">
        <img src="../assets/football_assist.png" />
      </div>
      <div class="data-team__headings yellow" title="Получени жълти картони">
        <div class="yellow-cards"></div>
      </div>
      <div class="data-team__headings red" title="Получени червени картони">
        <div class="red-cards"></div>
      </div>
    </div>
    <div id="v-for-object" class="demo">
      <div
        v-for="(value, position) in AllPlayers"
        :key="position"
        class="data-team__info"
      >
        <div class="data-player__position" v-if="position == 'Goalkeeper'">
          Вратар
        </div>
        <div class="data-player__position" v-else-if="position == 'Defender'">
          Защитник
        </div>
        <div class="data-player__position" v-else-if="position == 'Midfielder'">
          Халф
        </div>
        <div class="data-player__position" v-else>Нападател</div>
        <div
          v-for="(key, index) in value"
          :key="index"
          class="data-player__conteiner"
        >
          <div class="data-player__info_name">
            {{ key.firstname }} {{ key.lastname }}
          </div>
          <div class="data-player__info">{{ key.age }}</div>
          <div class="data-player__info">
            <img
              :src="playerNationality(key)"
              class="player_nationality"
              :alt="key"
            />
          </div>
          <div class="data-player__info">{{ key["games"].appearences }}</div>
          <div class="data-player__info">{{ key["goals"].total }}</div>
          <div class="data-player__info">{{ key["goals"].assists }}</div>
          <div class="data-player__info">{{ key["cards"].yellow }}</div>
          <div class="data-player__info">{{ key["cards"].red }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    AllPlayers: {
      required: true,
    },
  },
  methods: {
    playerNationality(key) {
      // let data = this.AllPlayers;
      let srcImage = require("../assets/flags/" + key.nationality + ".png");
      return srcImage;
    },
  },
};
</script>
<style scoped>
</style>

