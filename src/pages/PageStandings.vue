<template>
  <div class="container container--tall container--max-width">
    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th class="ranking-head" v-for="(value,index) in headings" :key="index">{{value}}</th>
          </tr>
        </thead>
        <tbody>
          <router-link
            :to="{name: 'Team', params: {id: teams.team_id }}"
            tag="tr"
            v-for="(teams, index) in data"
            :key="teams.team_id"
            class="ranking-team"
          >
            <td
              v-if="index==0 || index==1 || index==2 || index==3"
              class="data-table-cl"
              title="Promotion - Champions League (Group Stage)"
            >{{teams.rank}}</td>
            <td
              v-else-if="index==4"
              class="data-table-el"
              title="Promotion - Europa League (Group Stage)"
            >{{teams.rank}}</td>
            <td
              v-else-if="index==17 || index==18 || index==19"
              class="data-table-relegation"
              title="Relegation - Championship"
            >{{teams.rank}}</td>
            <td v-else>{{teams.rank}}</td>
            <td>
              <div class="standing-team-logo" :style="teamLogo(index)"></div>
            </td>
            <td class="standing-team-name">{{teams.teamName}}
            </td>
            <td>{{teams["all"].matchsPlayed}}</td>
            <td>{{teams["all"].win}}</td>
            <td>{{teams["all"].draw}}</td>
            <td>{{teams["all"].lose}}</td>
            <td>{{teams["all"].goalsFor}}</td>
            <td>{{teams["all"].goalsAgainst}}</td>
            <td>{{teams.points}}</td>
            <td v-html="teamForm(teams['forme'])" class="teamForm"></td>
          </router-link>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "standing",
  data() {
    return {
      data: [],
      headings: [
        "#",
        "Отбор",
        "",
        "М",
        "П",
        "Р",
        "З",
        "В/Г",
        "Д/Г",
        "Точки",
        "Форма"
      ]
    };
  },
  methods: {
    teamLogo(index) {
      let logo = this.data[index]["logo"];
      let style = "background-image:url(" + logo + ")";
      return style;
    },
    teamForm(lastMatches) {
      let str = "";
      if(lastMatches){
        let form = lastMatches.split("");
        for (var i = 0; i < form.length; i++) {
          if (form[i] == "W") {
            str += '<div class="team-form win">W</div>';
          } else if (form[i] == "D") {
            str += '<div class="team-form draw">D</div>';
          } else {
            str += '<div class="team-form lose">L</div>';
          }
        }
 
      }else{
        str += '<div class="team-form empty">-</div>';
      }

      return str;
    }
  },
  beforeCreate() {
    // fetch(
    //   "https://apiv2.apifootball.com/?action=get_standings&league_id=148&APIkey=4fe68f2c425088b321d90b1325cabe2da79209df56b7c1c32b9d2f825ede4d21"
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     this.data = data;
    //   })
    fetch("https://api-football-v1.p.rapidapi.com/v2/leagueTable/2790", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "48c5cfd3d6msha92bc85ca7a47abp178e66jsn450b9742e064"
      }
    })
      .then(response => {
        let data = response.json();
        data.then(data => {
          this.data = data["api"]["standings"][0];
          //console.log(this.data)
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
.data-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.data-table th {
  text-align: center;
  border-bottom: 2px solid #ddd;
}

.data-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.03);
}
.teamForm {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.team-form {
  display: flex;
  flex-flow: column nowrap;
  cursor: pointer;
  justify-self: center;
  align-items: center;
  color: #fff;
  width: 20px;
  height: 20px;
  margin-right: 2px;
  background-repeat: no-repeat;
  border-radius: 2px;
  overflow: hidden;
  text-align: center;
  line-height: 22px;
  position: relative;
  font-size: 13px;
}
.win {
  background-color: #44ac45;
}
.lose {
  background-color: #eb3f30;
}
.draw {
  background-color: #ffb22f;
}
.empty {
  background-color: #9e9e9e;
}
.data-table td,
.data-table th {
  padding: 10px;
}
.ranking-team {
  cursor: pointer;
}
.data-table tr + tr {
  border-top: 1px solid #ddd;
}

.data-table a {
  color: #3498db;
  text-decoration: none;
}

.data-table a:hover {
  color: #2980b9;
}

.table-scroll {
  overflow: hidden;
}

.current-user {
  font-weight: bold;
}

.container--tall {
  padding-top: 48px;
  padding-bottom: 48px;
}

.container {
  margin: 0 auto;
  padding: 24px;
}

.data-table-el {
  background-color: #7f0029;
  color: #ffffff;
}

.data-table-cl {
  background-color: #004682;
  color: #ffffff;
}

.data-table-relegation {
  background-color: #bd0000;
  color: #ffffff;
}
.standing-team-name{
  text-align: left;
}

.standing-team-logo{
    margin-left: 30px;
    background-size: 25px;
    width: 25px;
    height: 25px;
}
</style>
