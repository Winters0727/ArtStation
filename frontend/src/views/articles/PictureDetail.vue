<template>
  <div class="picture-detail-box">
    <img
        id="selected-picture"
        :src="`${dbURL}/storage/${picture.filePath}`"
        :alt="picture.picTitle"
        :title="picture.picTitle"
        @click="pictureCountUp(picture)"
      />
      <p>
        {{ picture.picTitle }}
      </p>
      <p>
        {{ picture.picArtist }}
      </p>
      <p>
        {{ picture.picContext }}
      </p>
      <p>
        조회수 : {{ picture.clickCount }}
      </p>
  </div>
</template>

<script>
export default {
    name : 'PictureDetail',
    props : [
      'picture'
    ],
    data() {
        return {
            dbURL : process.env.VUE_APP_BACKEND_URL,
        }
    },
    created() {
      
    }
}
</script>

<style scoped>
div, p {
  font-family: 'Do Hyeon', sans-serif;
}

</style>