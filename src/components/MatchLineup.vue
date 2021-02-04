<template>
<div>
    <div> 
        <FieldSoccer :homeTeamData="matchEvents['lineups'][Object.keys(matchEvents['lineups'])[0]].startXI" :awayTeamData="matchEvents['lineups'][Object.keys(matchEvents['lineups'])[1]].startXI" />
    </div>
    <div class="data-statistics-lineup-container">
        <StartingLineups 
            :homeTeam="MatchInfo[Object.keys(MatchInfo)[0]].startXI" 
            :awayTeam="MatchInfo[Object.keys(MatchInfo)[1]].startXI" 
            :homeSubstitutions="MatchInfo[Object.keys(MatchInfo)[0]].substitutes"  
            :awaySubstitutions="MatchInfo[Object.keys(MatchInfo)[1]].substitutes"
            :events = matchEvents
         />
        <TeamCoach 
            :coach="teamsCoach"
        />
    </div>
</div>
</template>

<script>
import TeamCoach from "@/components/TeamCoach";
import StartingLineups from "@/components/StartingLineups";
// import Substitutes from "@/components/MatchSubstitutes";
import FieldSoccer from "@/components/FieldSoccer";
export default {
    components: {
        TeamCoach,
        StartingLineups,
        // Substitutes,
        FieldSoccer
    },
    props: {
        MatchInfo: {
            required: true
        },
        matchEvents: {
            required: true
        }
    },
    computed:{
        teamsCoach(){
            let coach = this.MatchInfo;
            console.log(coach)
            this.$store.state.matchEvents = this.matchEvents;
            let names = [];
            for(var key in coach){
                names.push(coach[key]["coach"])
            }
            return names;
        }
    }
}
</script>

<style>
.data-statistics-lineup-container{
    width:550px;
    margin:0 auto;
    font-size:15px;
}
.data-statistics-lineup__home-team{
    width:275px;
    border-right: 2px solid rgba(0,0,0,.12);
    display: inline-block;
}
.data-statistics-lineup-text{
    padding: 5px;
    color: #656565;
    background-color: #e7e7e7;
}
.data-statistics-lineup__away_players{
    padding: 10px;
    text-align: right;
}
.data-statistics-lineup__home_players{
    padding: 10px;
    text-align: left;
}
.data-statistics-lineup__away-team{
    width: 275px;
    display: inline-block;
    border-left: 0px;
}
</style>