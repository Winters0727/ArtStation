<template>
  <div>
    <Gallery :user="galleryUser" />
  </div>
</template>

<script>
import Gallery from '@/components/articles/Gallery'

import { isLogin } from '@/utils/index'

export default {
    name : 'Index',
    data() {
        return {
          galleryUser : null,
        }
    },
    components : {
      Gallery : Gallery
    },
    computed : {
      isLogin : isLogin
    },
    created() {
      if (this.isLogin) {
        this.galleryUser = 'winters';
      } else {
        this.galleryUser = 'None';
      }
    }
}
</script>

<style scoped>

</style>