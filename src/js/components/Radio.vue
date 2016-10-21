<template>
    <div class="md-radio-field">
        <input type="radio"
               :class="{ disabled: disabled }"
               :id="id"
               :value="value"
               :name="name"
               :disabled="disabled"
               style="display:none;">
        <div class="md-radio" @click="click">
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
                default: null
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
                input: null
            };
        },

        mounted() {
            this.input = this.$el.querySelector('input');
            this.radio = this.$el.querySelector('.md-radio');

            if (this.checked == true) {
                this.click();
            }
        },

        methods: {

            click() {
                var elements = document.querySelectorAll('input[type=radio][name=' + this.name + ']');

                if (elements.length > 1) {
                    for (var i = 0; i < elements.length; i++) {
                        if (elements[i].value != this.value) {
                            elements[i].checked = false;
                            elements[i].nextElementSibling.classList.remove('active');
                        }
                    }
                }

                this.radio.classList.add('active');
                this.input.checked = true;
            },
        },
    }
</script>
