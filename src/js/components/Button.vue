<template>
    <button class="md-button" :class="{disabled: disabled}" v-ripple>
        <md-icon v-if="icon" :right="iconRight" :left="!iconRight">
            {{ icon }}
        </md-icon>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            icon: String,
            iconRight: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        mounted() {
            //
        },
    }
</script>
