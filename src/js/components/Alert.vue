<template>
    <div class="md-alert">
        <slot></slot>
        <md-button v-if="closeable" class="md-icon-button md-alert-close"  @click.native="close" v-ripple>
            <md-icon>close</md-icon>
        </md-button>
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
