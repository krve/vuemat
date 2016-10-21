<template>
    <div class="md-widget">
        <div class="md-widget__header" v-if="title">
            <h3 class="md-widget__title">{{ title }}</h3>
        </div>
        <div class="md-widget__body">
            <slot></slot>
        </div>
        <div class="md-widget__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String
        },

        mounted() {
            //
        },
    }
</script>
