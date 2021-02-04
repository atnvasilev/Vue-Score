<template>
    <div class="statistics">
        <div class="data-statistics__container" v-for="(value, index) in Statistics" :key="index">
            <div class="data-statistics__home">{{value['home'] !== null ? value['home'] : "0" }}</div>
            <div class="data-statistics__type">{{index}}</div>
            <div class="data-statistics__away">{{value['away'] !== null ? value['away'] : "0"}}</div>

            <TeamStats :HomeStatistics="value['home']" :AwayStatistics="value['away']" />
        </div>
    </div>
</template>

<script>
import TeamStats from "@/components/TeamStats";
export default {
    components: {
        TeamStats
    },
    props: {
        Statistics: {
            required: true
        },
    }
}
</script>

<style>
.statistics{
    width: 550px;
    margin: 0 auto;
    padding-left: 90px;
}
</style>