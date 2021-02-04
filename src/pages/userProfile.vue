<template>
    <div>
        <div>TEST</div>
    </div>
</template>
<script>
export default {
    beforeCreate(){
        this.$emit("ready")
    }   
}
</script>