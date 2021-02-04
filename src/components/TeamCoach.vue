<template>
    <div>
        <div class="data-statistics-lineup-text">Треньор</div>
        <table class="data-statistics-lineup__home-team" style="border:0px">
            <tbody>
                <tr>
                    <td class="data-statistics-lineup__home_players">
                        <span>{{coach[0]}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="data-statistics-lineup__away-team" style="border:0px">
            <tbody style="float:right">
                <tr>
                    <td class="data-statistics-lineup__away_players">
                        <span>{{coach[1]}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        coach: {
            required: true
        },
        
    }
}
</script>

<style>

</style>