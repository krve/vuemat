<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            direction: {
                type: String,
                default: "left"
            }
        },

        data() {
            return {
                tooltipHTML: null,
                tooltip: null,
                spacing: 5
            };
        },

        mounted() {
            this.tooltipHTML = this.$el.innerHTML;

            this.$el.parentElement.addEventListener('mouseenter', event => {
                var viewportOffset = event.target.getBoundingClientRect();

                var x = viewportOffset.left;
                var y = viewportOffset.top;
                this.show(x, y, event.target);
            });

            this.$el.parentElement.addEventListener('mouseleave', event => {
                this.tooltip.remove();
            });

            document.addEventListener('scroll', () => {
                var tooltips = document.querySelectorAll('.md-tooltip');

                if (tooltips.length > 0) {
                    for (var i = 0; i < tooltips.length; i++) {
                        tooltips[i].remove();
                    }
                }
            });

            this.$el.remove();
        },

        methods: {
            show(x, y, element) {
                this.tooltip = document.createElement('DIV');
                this.tooltip.classList.add('md-tooltip');
                this.tooltip.innerHTML = this.tooltipHTML;

                document.body.appendChild(this.tooltip);

                var width = this.tooltip.clientWidth;
                var height = this.tooltip.clientHeight;
                var elementWidth = element.clientWidth;
                var elementHeight = element.clientHeight;

                var left = (x - width - this.spacing);
                var top = (y + (elementHeight / 2 - height / 2));

                if (this.direction == 'top') {
                    left = (x + (elementWidth / 2 - width / 2));
                    top = (y - height - this.spacing);
                } else if (this.direction == 'right') {
                    left = x + elementWidth + this.spacing;
                } else if (this.direction == 'bottom') {
                    left = (x + (elementWidth / 2 - width / 2));
                    top = (y + elementHeight + this.spacing);
                }

                this.tooltip.style.left = left + 'px';
                this.tooltip.style.top = top + 'px';
            }
        },
    }
</script>
