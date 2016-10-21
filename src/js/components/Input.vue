<template>
    <div class="md-input-field">
        <input class="md-input"
               :class="{ disabled: disabled }"
               :type="type"
               :name="name"
               :placeholder="placeholder"
               :id="id"
               :value="value"
               :required="required"
               :disabled="disabled"
               @focus="update"
               @blur="update">
        <label :for="id">
            <slot></slot>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            placeholder: {
                type: String,
                default: null
            },
            id: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: null
            },
            required: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                input: null,
                label: null,
                actives: ['file', 'date', 'time']
            };
        },

        mounted() {
            this.input = this.$el.querySelector('input');
            this.label = this.input.nextElementSibling;
            this.update();
        },

        methods: {

            update() {
                var inputValue = this.input.value;
                var placeholderValue = this.input.getAttribute('placeholder');

                if (this.actives.indexOf(this.type) != -1 || this.input === document.activeElement || (inputValue != null && inputValue != '' && inputValue != undefined) || placeholderValue != null) {
                    this.label.classList.add('active');
                } else if ((inputValue == null || inputValue == '' || inputValue == undefined) && placeholderValue == null) {
                    this.label.classList.remove('active');
                }
            }

        },
    }
</script>
