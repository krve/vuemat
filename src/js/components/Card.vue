<template>
    <div class="md-card">
        <div v-if="image">
            <a :href="imageLink" v-if="imageLink">
                <img :src="image" :alt="imageAlt" v-if="image">
            </a>
            <img :src="image" :alt="imageAlt" v-else>
        </div>
        <div class="md-card-avatar" v-if="avatar">
            <img :src="avatar" :alt="avatarAlt">
        </div>
        <div class="md-card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            image: String,
            imageLink: String,
            imageAlt: String,
            avatar: String,
            avatarAlt: String,
        },

        mounted() {
            //
        },
    }
</script>
