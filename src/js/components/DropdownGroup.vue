<template>
    <div class="md-dropdown-group-wrapper">
        <div class="md-dropdown-group">
            {{ label }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            label: String
        },

        mounted() {

        }
    }
</script>
