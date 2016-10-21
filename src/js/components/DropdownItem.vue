<template>
    <a class="md-dropdown-item" :href="href">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        props: {
            href: {
                type: String,
                default: "javascript:void(0);"
            }
        },

        mounted() {

        }
    }
</script>
