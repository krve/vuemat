<template>
    <div class="md-dropdown-wrapper">
        <span @click="showDropdown">
            <slot name="button">
                <md-button class="md-raised md-primary">{{ title }}</md-button>
            </slot>
        </span>
        <ul class="md-dropdown" :class="{ active: open }">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            wrapper: {
                type: String,
                default: '.md-dropdown-wrapper'
            }
        },

        data() {
            return {
                open: false,
            }
        },

        mounted() {
            // Hide the dropdown when you click outside the wrapper
            document.addEventListener('click', (e) => {
                var closestElement = closest(e.target, this.wrapper);
                var thisClosestElement = closest(this.$el, this.wrapper);

                if ((closestElement == null || closestElement != thisClosestElement) && this.open == true) {
                    this.hideDropdown();
                }
            });

            var clickables = this.$el.querySelector('.md-dropdown').children;

            for (var i = 0; i < clickables.length; i++) {
                clickables[i].addEventListener('click', () => {
                    this.hideDropdown();
                });
            }
        },

        methods: {
            /**
             * Show the dropdown
             */
            showDropdown() {
                this.open = true;
            },

            /**
             * Hide the dropdown
             */
            hideDropdown() {
                this.open = false;
            },
        }
    }
</script>
