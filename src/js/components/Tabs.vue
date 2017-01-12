<template>
    <div class="md-tabs">
        <ul>
            <li v-for="tab in tabs" :class="{ 'active': tab.isActive }" :id="tab.id">
                <a :href="tab.href" @click="selectTab($event, tab)">{{ tab.title }}</a>
            </li>
            <span class="md-tabs-bar" ref="bar"></span>
        </ul>
        <div class="md-tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {},

        data() {
            return {
                tabs: [],
                activeBar: null,
            }
        },

        mounted() {
            this.tabs = this.$children;
            this.activeBar = this.$refs.bar;

            setTimeout(() => {
                this.tabs.forEach(tab => {
                    if (tab.isActive == true) {
                        this.$el.querySelector('#' + tab.id).click();
                    }
                });
            }, 500);
        },

        methods: {
            selectTab(event, selectedTab) {
                this.tabs.forEach(tab => {
                    tab.isActive = (tab.title == selectedTab.title);
                });

                // Move the active-bar
                const target = event.target;
                const paddingOffset = window.outerWidth < 768 ? 10 : 0;
                const scrollOffset = closest(this.activeBar, 'ul').scrollLeft;
                const offsetLeft = target.offsetLeft + scrollOffset;
                const width = target.offsetWidth;

                this.activeBar.style.left = offsetLeft + 'px';
                this.activeBar.style.width = width + 'px';
            }
        }
    }
</script>
