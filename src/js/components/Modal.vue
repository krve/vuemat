<template>
    <transition name="modal">
        <div class="md-modal-wrapper" v-show="show">
            <div class="md-modal" :class="{ 'md-modal--small': small }" ref="modal" @click>
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
            small: Boolean
        },

        data() {
            return {
                show: false
            }
        },

        mounted() {
            // Hide the modal when you click on the overlay
            this.$el.addEventListener('click', (e) => {
                var closestElement = closest(e.target, '.md-modal');
                var thisClosestElement = this.$refs.modal;

                if ((closestElement == null || closestElement != thisClosestElement) && this.show == true) {
                    this.close();
                }
            });
        },

        methods: {
            open() {
                this.show = true;
                document.querySelector('body').classList.add('modal-open');

                document.addEventListener('keyup', e => {
                    if (e.keyCode == 27) {
                        this.close();
                    }
                });

                this.$emit('open');
            },

            close() {
                this.show = false;
                document.querySelector('body').classList.remove('modal-open');

                document.removeEventListener('keyup', e => {
                    if (e.keyCode == 27) {
                        this.close();
                    }
                });

                this.$emit('close');
            },
        }
    }
</script>
