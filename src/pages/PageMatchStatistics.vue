<template>
    <div class="main_statistics_container">
        <div class="radio-list_back__button">
            <router-link :to="{name: 'Schedule'}">
                <ul class="radio-list__back">
                    <li class="radio-list__item active" >
                        <a  class="radio-list__link_back">Назад</a>
                    </li>
                </ul>
            </router-link>
        </div>
        <div class="data-statistics__matchTime">
            <div class="data-statistics__matchDay">{{allEvents["event_date"]}}</div>
            <!-- <div class="data-statistics__matchDay">{{allEvents["event_date"].slice(0, allEvents["event_date"].lastIndexOf('-')+3)}}</div> -->
            <div class="data-statistics__teams_result">
                <div class="data-statistics__homeTeamLogo" :style="{ backgroundImage: 'url(' + setHomeTeamLogo + ')' }"></div>
                <div class="data-statistics__team__name">{{allEvents["homeTeam"].team_name}}</div>
                <span class="data-statistics_team_score homeScore">{{allEvents.goalsHomeTeam !== '' ? allEvents.goalsHomeTeam : "-"}}</span>
                <span class="data-statistics__team__name"> - </span>
                <span class="data-statistics_team_score awayScore">{{allEvents.goalsAwayTeam !== '' ? allEvents.goalsAwayTeam : "-"}}</span>
                <div class="data-statistics__team__name">{{allEvents["awayTeam"].team_name}}</div>
                <div class="data-statistics__awayTeamLogo"  :style="{ backgroundImage: 'url(' + setAwayTeamLogo + ')' }"></div>
            </div>
        </div>
        <div class="forecast-container">
            <table class="bookmaker-forecast-container">
                <tbody>
                    <tr class="forecast-row">
                        <td class="bookmaker-row"><div class="bookmaker-logo-container"><span class="bookmaker-logo"></span></div></td>
                        <td class="forecast-home-container"><div class="forecast-home" :style="matchStatus"><span class="odd-type">1</span><span class="odd">{{odds[0].odd}}</span></div></td>
                        <td class="forecast-home-container"><div class="forecast-home" :style="matchStatus"><span class="odd-type">X</span><span class="odd">{{odds[1].odd}}</span></div></td>
                        <td class="forecast-home-container"><div class="forecast-home" :style="matchStatus"><span class="odd-type">2</span><span class="odd">{{odds[2].odd}}</span></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="filters data-statistics-filters">
            <ul class="radio-list data-statistics-radio-list">
                <li @click="activate(1)" class="radio-list__item data-statistics-lineup"  :class="{active:active_el == 1}">
                    <a @click="showStatistics = true" class="radio-list__link data-statistics-menu" style="">Статистика</a>
                </li>
                <li @click="activate(2)" class="radio-list__item data-statistics-lineup" :class="{active:active_el == 2}">
                    <a  @click="showStatistics = false" class="radio-list__link data-statistics-menu">Състави</a>
                </li>
            </ul>
        </div>

        <MatchStats :Statistics="data" v-if="showStatistics && Object.keys(data).length > 0" />
        <MatchLineup :MatchInfo="lineup" :matchEvents="allEvents" v-else-if="Object.keys(lineup).length > 0" />
        <MatchNotStarted v-else />
    </div>
</template>
<script>
import MatchLineup from "@/components/MatchLineup";
import MatchStats from "@/components/MatchStats";
import MatchNotStarted from "@/components/MatchNotStarted";
export default {
    components: {
        MatchLineup,
        MatchStats,
        MatchNotStarted
    },
    data(){
        return {
            data: [],
            allEvents: [],
            matchId: null,
            lineup: [],
            active_el: 1,
            showStatistics: true,
            odds: [],
            homeTeamLogo: ""
        };
    },

    methods: {
        activate:function(el){
            this.active_el = el;
        }
    },

    computed:{
        setHomeTeamLogo(){
            let homeTeamLogo = this.allEvents["homeTeam"].logo;
            return homeTeamLogo;
        },
        setAwayTeamLogo(){
            let awayTeamLogo = this.allEvents["awayTeam"].logo;
            return awayTeamLogo;
        },
        matchStatus(){
            if(this.allEvents.statusShort == "FT"){
                return 'text-decoration:line-through;pointer-events: none;';
            }else{
               return 'text-decoration:none;'; 
            }
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
     
        fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/id/"+this.$route.params.id, {
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
                this.allEvents = data["api"]["fixtures"][0];
                if(data["api"]["fixtures"][0]["status"] != "Not Started"){
                    this.data = data["api"]["fixtures"][0]["statistics"];
                    this.lineup = this.allEvents["lineups"];
                }
            });
        }).then(this.$emit("ready"))
    }
}
</script>

<style>
.data-statistics__matchTime{
    display: inline-block;
    width: 100%;
    text-align: left;
    font-size: 18px;
    border-bottom: 2px solid rgba(0,0,0,.12);
    opacity: .75;
    padding: 10px 0px 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.data-statistics-radio-list{
    border-radius: 0;
    width: 100%;
}
.data-statistics__matchDay{
    text-align: center;
    float: left;
}
.data-statistics__teams_result{
    width: 550px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.data-statistics-filters{
    padding-bottom: 15px;
    padding-top: 15px;
    width: 550px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 90px;
}
.data-statistics-lineup{
    width:100%;
}
.data-statistics-menu{
    padding: 5px;
}
.data-statistics_team_score{
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
.data-statistics__homeTeamLogo{
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 45px;
}
.data-statistics__awayTeamLogo{
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 45px;
}
.homeScore{
    margin-right: 5px;
    margin-left: 5px;
}
.awayScore{
    margin-right: 5px;
    margin-left: 5px;
}
.data-statistics__team__name{
    color: #2c3e50;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    display: inline;
    position: relative; 
    /* bottom:10px; */
}
.radio-list__back{
    padding: 0;
    list-style: none;
    text-align: center;
    display: -webkit-inline-box;
    margin: auto;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 30px;
    overflow: hidden;
    background: #fff;
}
.radio-list__link_back{
    text-transform: uppercase;
    text-decoration: none;
    display: block;
    padding: 12px 50px;
    color: #ffffff;
    cursor: pointer;
}
.radio-list_back__button{
    margin-top: 10px;
    margin-bottom: 10px;
}
.main_statistics_container{
    margin-top:20px;
}
.data-statistics__home{
    float: left;
}
.data-statistics__away{
    float: right;
}
.data-statistics__type{
    display: inline-block;
}
.data-statistics__container{
    width: 500px;
    margin:0 auto;
    padding: 5px;
}
.bookmaker-forecast-container{
    width: 550px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 90px;
}
.bookmaker-forecast-container{
    border-spacing: 0px;
    width: 500px;
    margin: 0 auto;
    margin-top: 10px;
    border-collapse: collapse;
}

.forecast-row{
    border: 1px solid #e4e4e4;
    border-spacing: 0px;
    border-collapse: collapse; 
}
.bookmaker-row{
    line-height: 21px;
    min-height: 21px;
    width: 200px;
}
.bookmaker-logo-container{
    display: flex;
    flex-flow: row nowrap; 
}
.bookmaker-logo{
    background-image: url(https://www.flashscore.com/res/image/data/bookmakers/30-16.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    float: left;
    line-height: 16px;
    width: 90px;
    height: 30px;
    margin: 5px;
}
.forecast-home-container{
    line-height: 21px;
    min-height: 21px;
    width: 100px;
}
.forecast-home {
    display: flex;
    flex-flow: row nowrap;
    float: left;
    text-decoration: none;
    cursor: pointer;
    color: #656565;
    padding: 5px 5px 5px 0;
    line-height: 21px;
    background-color: #eee;
    margin: 5px;
}
.forecast-home:hover{
    background-color: #dedede;
}
.odd-type{
    border: none!important;
    border-radius: 0!important;
    background: var(--color-background-4)!important;
    color: var(--color-text-1)!important;
    height: 27px!important;
    line-height: 27px!important;
    float: none!important;
    border-right: 1px solid rgba(0,0,0,.2)!important;
    white-space: nowrap;
    margin: 0;
    padding: 0 7px;
    display: block;
    text-align: center;
    flex: 1 1 auto;
    font-weight: bold;
}
.odd{
    border: none!important;
    border-radius: 0!important;
    background: var(--color-background-4)!important;
    color: var(--color-text-1)!important;
    height: 27px!important;
    line-height: 27px!important;
    float: none!important;
    white-space: nowrap;
    margin: 0;
    padding: 0 7px;
    display: block;
    text-align: center;
    flex: 1 1 auto;
}
</style>