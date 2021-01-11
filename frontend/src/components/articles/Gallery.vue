<template>
  <v-container>
    <v-row>
      <v-col class="gallery-wrapper" cols=3 v-for="(picture, index) in pictureList" :key="index">
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
        if (this.user === "None") {
            this.pictureList = await this.$store.dispatch('getPictures');
        }

        console.log(this.pictureList)
    }
}
</script>

<style>
.gallery-wrapper {
    padding: 0;
    margin: 2px;
}

.gallery-picture {
    width: 100%;
    height: 100%;
}
</style>