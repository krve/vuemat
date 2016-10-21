<template>
    <div class="md-checkbox-field">
        <input type="checkbox"
               :class="{ disabled: this.disabled }"
               :id="id"
               :value="value"
               :name="name"
               :disabled="disabled"
               :checked="checked">
        <div class="md-checkbox" :class="{ active: checked }" @click="toggle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            id: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: "1"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            checked: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                input: null,
            };
        },

        mounted() {
            this.input = this.$el.querySelector('input');
            this.checkbox = this.$el.querySelector('.md-checkbox');
        },

        methods: {

            toggle() {
                if (this.checkbox.classList.contains('active')) {
                    this.checkbox.classList.remove('active');
                    this.input.checked = false;
                } else {
                    this.checkbox.classList.add('active');
                    this.input.checked = true;
                }
            },
        },
    }
</script>
