<template>
  <div class="not_started">
    <table class="match__not-started-contaier">
      <tbody>
        <tr>
          <td class="match__not-started">Maчът все още не е започнал</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

    data(){
        return {
            odds: [],
        }
    },

        beforeCreate() {
     
        fetch("https://api-football-v1.p.rapidapi.com/v2/odds/fixture/"+this.$route.params.id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "48c5cfd3d6msha92bc85ca7a47abp178e66jsn450b9742e064"
            }
        })
        .then(response => {
            /* eslint-disable */
            let data = response.json();
            data.then(data => {     
                this.odds = data["api"]["odds"][0]["bookmakers"][0]["bets"][0].values;
            });
        })
    }
}
</script>

<style scoped>
.not_started {
  width: 500px;
  margin: 0 auto;
  padding-left:90px;
}
.match__not-started-contaier {
  height: 250px;
  width: 500px;
  border: 1px solid #cecece;
  background-color: #f5f5f5;
}
.match__not-started {
  color: rgb(114, 114, 114);
  font-size: 18px;
  text-transform: uppercase;
}
</style>