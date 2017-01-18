<template>
    <div class="md-tab">
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
            return {}
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
            this.parentTabs = getClosestVueParent(this.$parent, 'md-tabs');

            if (!this.parentTabs) {
                throw new Error('You must wrap the md-tab in a md-tabs');
            }

            this.parentTabs.registerTab(this);
        }
    }
</script>
