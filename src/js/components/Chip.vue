<template>
    <div class="md-chip">
        <slot></slot>
        <md-icon v-if="closeable" @click.native="close">close</md-icon>
    </div>
</template>

<script>
    export default {
        props: {
            closeable: {
                type: Boolean,
                default: false,
            }
        },

        mounted() {
            //
        },

        methods: {
            close() {
                this.$el.remove();
            }
        }
    }
</script>
