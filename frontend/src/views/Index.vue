<template>
  <div>
    <Gallery user="None" />
  </div>
</template>

<script>
import Gallery from '@/components/articles/Gallery'

export default {
    name : 'Index',
    data() {
        return {

        }
    },
    components : {
      Gallery : Gallery
    }
}
</script>

<style>

</style>