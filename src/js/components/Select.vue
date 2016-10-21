<template>
    <div class="md-select-wrapper">
        <select :name="name" :id="id" :multiple="multiple">
            <option class="md-select-none"></option>
            <slot></slot>
        </select>
        <div class="md-select">
            <label :for="id" class="md-select-label">{{ label }}</label>
            <div class="md-select-toggle" @click="showDropdown">
                {{ multiple && selected != null && selected.length > 1 ? (selected.length + ' Selected') : multiple && selected != null && selected.length == 1 ? selected[0].text : (selected && !multiple ? selected.text : placeholder) }}
            </div>
        </div>
        <md-dropdown ref="dropdown" wrapper=".md-select-wrapper">
            <div slot="button"></div>
            <md-dropdown-item v-if="optionGroups.length == 0" class="disabled">{{ placeholder }}</md-dropdown-item>
            <md-dropdown-group v-for="group in optionGroups" :label="group.label">
                <md-dropdown-item v-for="option in group.options"
                                  @click.native="selectOption(option)"
                                  :class="{ active: option.active }">
                    <md-checkbox v-if="multiple"
                                 class="md-checkbox-inline"
                                 :checked="option.active">{{ option.text }}</md-checkbox>
                    <span v-else>{{ option.text }}</span>
                </md-dropdown-item>
            </md-dropdown-group>
            <md-dropdown-item v-for="option in options"
                              @click.native="selectOption(option)"
                              :class="{ active: option.active }">
                <md-checkbox v-if="multiple"
                             class="md-checkbox-inline"
                             :checked="option.active">{{ option.text }}</md-checkbox>
                <span v-else>{{ option.text }}</span>
            </md-dropdown-item>
        </md-dropdown>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            name: String,
            id: String,
            multiple: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: 'Choose your option'
            }
        },

        data() {
            return {
                select: null,
                selected: null,
                options: [],
                optionGroups: [],
            }
        },

        mounted() {
            this.updateOptions();

            // Hide the dropdown when you click outside the wrapper
//            document.addEventListener('click', (e) => {
//                var closestElement = closest(e.target, '.md-select-wrapper');
//                if (closestElement == null || closestElement != this.$el) {
//                    this.hideDropdown();
//                }
//            });
        },

        methods: {
            /**
             * Fetch all the options from the select
             */
            updateOptions() {
                this.select = this.$el.querySelector('select');
                var selectChildren = this.select.children;

                // It starts at one to prevent it from taking the first placeholder option
                // The placeholder option is used to prevent the select from automatically
                // selecting the first option
                for (var i = 1; i < selectChildren.length; i++) {
                    // If the child-element is a option-group loop through its children
                    // and add them to the options-groups option array.
                    if (selectChildren[i].tagName == 'OPTGROUP') {
                        var addedOptionGroup = {
                            id: this.optionGroups.length,
                            label: selectChildren[i].getAttribute('label'),
                            options: [],
                        };

                        this.addOptionGroup(addedOptionGroup);
                        var optionGroupChildren = selectChildren[i].children;

                        for (var j = 0; j < optionGroupChildren.length; j++) {
                            addedOptionGroup.options.push(
                                this.createOptionObject(optionGroupChildren[j])
                            );

                            this.setSelectedOption(
                                addedOptionGroup.options[addedOptionGroup.options.length - 1]
                            );
                        }
                    } else {
                        this.addOption(
                            this.createOptionObject(selectChildren[i])
                        );

                        this.setSelectedOption(
                            this.options[this.options.length - 1]
                        );
                    }
                }
            },

            /**
             * Create an option object from a HTML Element
             */
            createOptionObject(optionElement) {
                return {
                    text: optionElement.innerHTML,
                    value: optionElement.value,
                    element: optionElement,
                    active: optionElement.selected,
                };
            },

            /**
             * Add an option
             */
            addOption(option) {
                this.options.push(option);
            },

            /**
             * Add an option group
             **/
            addOptionGroup(group) {
                this.optionGroups.push(group);
            },

            /**
             * Set the selected option
             */
            setSelectedOption(option) {
                if (option.active == true) {
                    if (this.multiple != true) {
                        this.selected = option;
                    } else {
                        if (Object.prototype.toString.call(this.selected) !== '[object Array]') {
                            this.selected = [];
                        }

                        if (this.selected.indexOf(option) !== -1) {
                            this.selected.splice(this.selected.indexOf(option), 1);
                        } else {
                            this.selected.push(option);
                        }
                    }
                }
            },

            /**
             * Select the specified option
             *
             * @param option
             */
            selectOption(option) {
                if (this.multiple != true) {
                    this.resetSelected();
                    this.selected = option;

                    option.active = true;
                    option.element.selected = true;
                    option.element.classList.add('active');

                    this.hideDropdown();
                } else {
                    // Check if option is already checked, if it is then deselect it
                    if (option.active == true) {
                        option.active = false;
                        option.element.selected = false;
                        option.element.classList.remove('active');
                        this.selected.splice(this.selected.indexOf(option), 1);
                    } else {
                        if (Object.prototype.toString.call(this.selected) !== '[object Array]') {
                            this.selected = [];
                        }
                        this.selected.push(option);
                        option.active = true;
                        option.element.selected = true;
                        option.element.classList.add('active');
                    }
                }
            },

            /**
             * Reset the selected options
             */
            resetSelected() {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].active = false;
                    this.options[i].element.selected = false;
                    this.options[i].element.classList.remove('active');
                }

                for (var i = 0; i < this.optionGroups.length; i++) {
                    for (var j = 0; j < this.optionGroups[i].options.length; j++) {
                        this.optionGroups[i].options[j].active = false;
                        this.optionGroups[i].options[j].element.selected = false;
                        this.optionGroups[i].options[j].element.classList.remove('active');
                    }
                }
            },

            /**
             * Show the dropdown
             */
            showDropdown() {
                this.$refs.dropdown.showDropdown();
            },

            /**
             * Hide the dropdown
             */
            hideDropdown() {
                this.$refs.dropdown.hideDropdown();
            },
        }
    }
</script>
