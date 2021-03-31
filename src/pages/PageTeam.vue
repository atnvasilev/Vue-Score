<template>
  <div class="container container--tall container--max-width">
    <div class="table-scroll">
      <div>
        <div
          class="data-team__teamLogo"
         
          v-bind:style="{ backgroundImage: `url(${teamImage})`}"
        ></div>
        <div class="data-team__teamName">
          <div class="data-team__teamText">{{teamName}}</div>
        </div>
      </div>
      <div>
        <input
          type="search"
          class="search__team"
          placeholder="Търсене на играч"
          v-model="searchPlayer"
          @click="showSearch = true"
        />
        <SearchPlayers :players="filteredPlayers"  v-if="showSearch" />
        <PlayersInformation :AllPlayers="players"  v-else />
      </div>
    </div>
  </div>
</template>
<script>
import SearchPlayers from "@/components/SearchPlayers"
import PlayersInformation from "@/components/PlayersInformation"
export default {
  components: {
    SearchPlayers,
    PlayersInformation
  },
  data() {
    return {
      teamImage: [],
      teamName: "",
      teams: [],
      players: [],
      searchPlayer: "",
      showSearch: false,
      id: this.$route.params.id
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
    }
  },
  computed: {
    filteredPlayers() {
      let searchString = this.searchPlayer;
      let findPlayers = this.teams;
      /* eslint-disable */
      if (findPlayers !== 'undefined') {
        if (findPlayers.length > 1) {
          return findPlayers.filter(profile => {
            return (
              profile.player_name
                .toLowerCase()
                .indexOf(searchString.toLowerCase()) !== -1
            );
          });
        }
      }
      return 0;
    }
  },
  beforeCreate() {
    fetch("https://api-football-v1.p.rapidapi.com/v2/teams/team/"+this.$route.params.id, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "48c5cfd3d6msha92bc85ca7a47abp178e66jsn450b9742e064",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(data => {
        /* eslint-disable */
        this.teamImage = data["api"].teams[0].logo;
        this.teamName = data["api"].teams[0].name;
      })
      .then(() => this.$emit("ready"));

      fetch("https://api-football-v1.p.rapidapi.com/v2/players/team/"+this.$route.params.id+"/2020-2021", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": "48c5cfd3d6msha92bc85ca7a47abp178e66jsn450b9742e064"
        }
      })
      .then(response => {
        let data = response.json();
        data.then(data => {
          let myData = data["api"].players;
          let myPlayers = myData.filter(myData => myData.league == "Premier League");
          let usingPlayers = myPlayers.filter(myPlayers => myPlayers.position !== null);
          this.teams = usingPlayers
          let grouped = this.groupBy(usingPlayers, "position");
          this.players = grouped;
        });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => this.$emit("ready"));
  }
};
</script>

<style>
.search__team {
  width: 100%;
  opacity: 0.64;
  border-radius: 10px;
  height: 30px;
  outline: none;
  border-color: rgba(0, 0, 0, 0.12);
  padding-left: 10px;
  margin-top:20px;
}
.data-team__teamName {
  width: auto;
  height: 100px;
  float: left;
  justify-content: center;
  margin-left: 25px;
}
.team_info_number {
  position: relative;
  bottom: 5px;
}
.team_info_age {
  position: relative;
  bottom: 10px;
}
.team_info_name {
  position: relative;
  bottom: 10px;
}
.data-team__teamLogo {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  float: left;
  background-size: 100px 100px;
}
.data-player__position {
  padding: 5px;
  color: #656565;
  background-color: #e7e7e7;
}
.data-player__conteiner {
  padding: 10px;
  border-bottom: 2px solid #e7e7e7;
}
.red {
  position: relative;
  bottom: 6px;
}
.tshirt {
  position: relative;
  bottom: 10px;
}
.red-cards {
  background-color: red;
  height: 24px;
  width: 16px;
  border-radius: 20%;
  text-align: center;
  margin: 0 auto;
  bottom: 5px;
  position: relative;
  right: 5px;
}
.yellow {
  position: relative;
  bottom: 6px;
}
.yellow-cards {
  background-color: #ffeb3b;
  height: 24px;
  width: 16px;
  border-radius: 20%;
  text-align: center;
  margin: 0 auto;
  bottom: 5px;
  position: relative;
  right: 5px;
}
.data-team__teamText {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: #656565;
  font: normal bold 18px Arial, Helvetica, sans-serif;
}
.data-team__info {
  text-align: left;
  border-bottom: 2px solid #ddd;
  position: relative;
  display: grid;
  height: 100%;
}
.data-player__conteiner:hover {
  background: rgba(0, 0, 0, 0.03);
}
.football-ball {
  position: relative;
  bottom: 10px;
}
.data-team__headings {
  text-align: left;
  width: 10%;
  float: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  text-align: center;
}
.data-team__headings_name {
  text-align: left;
  width: 30%;
  font-weight: bold;
  float: left;
  border-bottom: 2px solid #ddd;
}
.data-player__info {
  text-align: left;
  width: 10%;
  float: left;
  text-align: center;
}
.data-player__info_name {
  text-align: left;
  width: 30%;
  float: left;
}
.data-team__container {
  width: 100%;
  display: inline-block;
  margin-top: 20px;
  position: relative;
  top: 14px;
}
.player_nationality {
  width:24px;
  height: 24px;
}
.team_info_nationality {
  position: relative;
  bottom: 10px;
}
</style>