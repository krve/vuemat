<template>
    <div class="md-tabs">
        <ul>
            <li v-for="tab in tabs" :id="tab.id" ref="tabHeader" :class="getTabClass(tab)" :disabled="tab.disabled">
                <a :href="tab.href" @click="selectTab(tab)" v-ripple>{{ tab.title }}</a>
            </li>
            <span class="md-tabs-indicator" :class="indicatorClasses" ref="indicator"></span>
        </ul>
        <div class="md-tabs-content" :style="{ height: contentHeight }">
            <div class="md-tabs-wrapper" :style="{ transform: `translate3D(-${contentWidth}, 0, 0)` }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {},

        data() {
            return {
                tabs: {},
                activeTab: null,
                activeTabNumber: null,
                contentHeight: '0px',
                contentWidth: '0px',
            }
        },

        mounted() {
            this.$nextTick(() => {
                if (Object.keys(this.tabs).length && !this.activeTab) {
                    let firstTab = Object.keys(this.tabs)[0];

                    this.selectTab(this.tabs[firstTab]);
                }
            });
        },

        computed: {
            indicatorClasses() {
                let toLeft = this.lastIndicatorNumber > this.activeTabNumber;

                this.lastIndicatorNumber = this.activeTabNumber;

                return {
                    'md-to-right': !toLeft,
                    'md-to-left': toLeft
                };
            }
        },

        methods: {
            getTabClass(tab) {
                return {
                    'md-active': (this.activeTab && this.activeTab.id) && this.activeTab.id  === tab.id,
                    'md-disabled': tab.disabled
                };
            },

            registerTab(tab) {
                this.tabs[tab.id] = tab;

                if (tab.selected) {
                    this.selectTab(tab);
                }
            },

            selectTab(selectedTab) {
                this.activeTab = selectedTab;
                this.activeTabNumber = this.getTabIndex(selectedTab.id);

                this.calculatePosition();
            },

            getTabIndex(id) {
                const idList = Object.keys(this.tabs);

                return idList.indexOf(id);
            },

            calculatePosition() {
                window.requestAnimationFrame(() => {
                    this.calculateIndicatorPosition();
                    this.calculateTabsWidthAndPosition();
                    this.calculateContentHeight();
                });
            },

            calculateIndicatorPosition() {
                if (this.$refs.tabHeader && this.$refs.tabHeader[this.activeTabNumber]) {
                    const tabsWidth = this.$el.offsetWidth;
                    const activeTab = this.$refs.tabHeader[this.getTabIndex(this.activeTab.id)];
                    const left = activeTab.offsetLeft;
                    const right = tabsWidth - left - activeTab.offsetWidth;

                    this.$refs.indicator.style.left = left + 'px';
                    this.$refs.indicator.style.right = right + 'px';
                }
            },

            calculateTabsWidthAndPosition() {
                const width = this.$el.offsetWidth;
                let index = 0;
                this.contentWidth = width * this.activeTabNumber + 'px';

                for (const tabId in this.tabs) {
                    const tab = this.tabs[tabId];
                    tab.$el.style.width = width + 'px';
                    tab.$el.style.left = width * index + 'px';
                    index++;
                }
            },

            calculateContentHeight() {
                this.$nextTick(() => {
                    if (Object.keys(this.tabs).length) {
                        let height = this.tabs[this.activeTab.id].$el.offsetHeight;

                        this.contentHeight = height + 'px';
                    }
                });
            }
        }
    }
</script>
