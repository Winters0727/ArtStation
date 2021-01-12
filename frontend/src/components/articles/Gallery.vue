<template>
  <v-container class="mt-5 mb-3">
    <v-row>
      <v-col :class="galleryClass" cols=3 v-for="(picture, index) in pictureList" :key="index">
        <img
        class="gallery-picture"
        :src="`${dbURL}/storage/${picture.filePath}`"
        :alt="picture.picTitle"
        :title="picture.picTitle"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name : 'Gallery',
    data() {
        return {
            galleryClass : 'preload',
            dbURL : process.env.VUE_APP_BACKEND_URL,
            pictureList : null,
        }
    },

    props : [
        'user'
    ],

    methods : {
        ...mapActions['getPictures'],
    },

    async created() {
        if (this.user === 'None') {
            this.pictureList = await this.$store.dispatch('getPictures', 28);
        }

        this.galleryClass = 'gallery-wrapper';
    },
}
</script>

<style scoped>
.preload {
  transition: none !important;
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -ms-transition: none !important;
  -o-transition: none !important;
}

.gallery-wrapper {
    position: relative;
    padding: 2px;
    margin: 0;
    animation: pictureOut 1s both ease-out;
}

.gallery-wrapper:hover {
    padding: 2px;
    margin: 0;
    animation: pictureOn 1s both ease-out;
}

.gallery-picture {
    position: relative;
    width: 100%;
    height: 300px;
    border: ridge 4mm #9696ff;
}

/* .gallery-picture:hover {
    animation: pictureOn 1s both;
} */

@keyframes pictureOn {
    to {
        transform: scale(1.1);
        opacity: 0.7;
        z-index: 1;
    }

    from {
        transform: scale(1);
        opacity: 1;
        z-index: 0;
    }
}

@keyframes pictureOut {
    from {
        transform: scale(1.1);
        opacity: 0.7;
        z-index: 1;
    }

    to {
        transform: scale(1);
        opacity: 1;
        z-index: 0;
    }
}
</style>