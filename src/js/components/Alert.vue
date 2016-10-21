<template>
    <div class="md-alert">
        <md-icon v-if="closeable" @click.native="close" right>close</md-icon>
        <slot></slot>
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
