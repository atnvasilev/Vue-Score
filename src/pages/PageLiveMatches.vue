<template>
    <div>
        <ScheduleList :schedules="liveMatches" v-if="Object.keys(liveMatches).length > 0"/>
        <div v-else class="no__data-live_matches">
            <table class="no__live-matches">
                <tbody>
                    <tr>
                        <td class="no_matches-text">В момента няма мачове на живо</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ScheduleList from "@/components/ScheduleList";
export default {
    components: {
        ScheduleList
    },
     data() {
        return {
            matches: []
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
    computed:{
        liveMatches(){
            let lives = this.matches.filter(item => {
                return item.status !== "Match Finished" && item.status !== 'Not Started';
            });
            return this.groupBy(lives, "round");
        }
    },
    beforeCreate() {
        fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/live/2790", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "48c5cfd3d6msha92bc85ca7a47abp178e66jsn450b9742e064"
            }
        })
        .then(response => response.json())
        .then(data => {
            this.matches =  data["api"]["fixtures"];
        })
        .then(() => this.$emit("ready"));
    },
}
</script>

<style scoped>
.no__data-live_matches{
    width: 500px;
    margin:0 auto;
    margin-top: 100px;
}
.no-matches-text{
    color: rgb(114, 114, 114);
    font-size: 18px;
    text-transform: uppercase;
}

.no__live-matches{
    height: 250px;
    width: 500px;
    border: 1px solid #CECECE;
    background-color: #f5f5f5;
}

</style>