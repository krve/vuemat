<template>
    <transition name="modal">
        <div class="md-modal-wrapper" v-show="show" @click="close">
            <div class="md-modal" @click.stop>
                <md-button class="md-icon-button md-modal-close" @click.native="close">
                    <md-icon class="md-circle">close</md-icon>
                </md-button>
                <div class="md-modal-title" v-if="title">{{ title }}</div>
                <div class="md-modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            title: String,
        },

        data() {
            return {
                show: false
            }
        },

        mounted() {

        },

        methods: {
            open() {
                this.show = true;
                this.$emit('open');
            },

            close() {
                this.show = false;
                this.$emit('close');
            },
        }
    }
</script>
