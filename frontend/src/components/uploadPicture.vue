<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
            <v-col cols=12>
              <v-text-field
                v-model="picTitle"
                name="Title" />
            </v-col>
            <v-col cols=12>
              <v-textarea
                v-model="picContext"
                name="Context" />
            </v-col>
            <v-col cols=12>
                <v-file-input
                  accept="image/*"
                  label="Picture"
                  v-model="picSrc"
                  @change="changeFile" />
            </v-col>
            <v-col cols=12>
                <div id="result">
                    <v-img
                      width="500px"
                      height="auto"
                      v-show="picUploaded !== null"
                      :src="picUploaded" />
                </div>
            </v-col>
        </v-row>
      </v-container>
        <v-btn
          color="primary"
          dark
          @click="submitPic">
          제출
        </v-btn>
    </v-form>
  </div>  
</template>

<script>
export default {
    name : 'UploadPicture',
    data() {
        return {
            picTitle : null,
            picContext : null,
            picGenere : null,
            picSrc : null,
            picUploaded : null,
        }
    },
    methods : {
        submitPic : function(e) {
            e.stopPropagation();
            e.preventDefault();
        },
        changeFile : function() {
            const blobData = this.picSrc.slice();
            console.log('실행');
            const data = URL.createObjectURL(blobData)
            this.picUploaded = data;
        }
    }
}
</script>

<style>

</style>