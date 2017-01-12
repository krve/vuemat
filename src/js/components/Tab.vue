<template>
    <div class="md-tab" v-show="isActive">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            title: { required: true },
            selected: { default: false }
        },

        data() {
            return {
                isActive: false,
            }
        },

        computed: {
            href() {
                return '#' + this.id;
            },

            id() {
                return this.title.toLowerCase().replace(/ /g, '-');
            }
        },

        mounted() {
            this.isActive = this.selected;
        }
    }
</script>
