<template>
    <i class="md-icon material-icons" :class="{right: right, left: left}">
        <slot></slot>
    </i>
</template>

<script>
    export default {
        props: {
            right: {
                type: Boolean,
                default: false
            },
            left: {
                type: Boolean,
                default: false
            },
        },

        mounted() {
            //
        },
    }
</script>
