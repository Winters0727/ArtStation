<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
            <v-col cols=12>
              <v-text-field
                v-model="picTitle"
                name="picTitle" />
            </v-col>
            <v-col cols=12>
              <v-textarea
                v-model="picContext"
                name="picContext" />
            </v-col>
            <v-col cols=12>
                <v-file-input
                  id="uploadedImage"
                  name="picImage"
                  type="file"
                  accept="image/*"
                  label="Picture"
                  v-model="picSrc"
                  prepend-icon="mdi-camera"
                  @change="changeFile" />
            </v-col>
            <v-col cols=12>
                <div id="result">
                    <img
                      width="10%"
                      height="10%"
                      id="uploadedImage"
                      v-show="picUploaded !== null"
                      :src="picUploaded" />
                      <a
                      v-show="picUploaded !== null"
                      :href="picUploaded"
                      @click="downloadPic">
                      다운로드
                      </a>
                </div>
            </v-col>
            <v-col cols=12>
                <div id="resResult">
                    
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
import { mapActions } from 'vuex'

export default {
    name : 'UploadPicture',
    data() {
        return {
            picTitle : null,
            picContext : null,
            picGenere : null,
            picBlob : null,
            picSrc : null,
            picFile : null,
            picWidth : null,
            picHeight : null,
            picUploaded : null,
            picRes : null,
        }
    },
    methods : {
        ...mapActions(['uploadPicture', 'getPictures']),

        submitPic : async function(e) {
            e.preventDefault();
            e.stopPropagation();
            let payload = new FormData();
            payload.append('picTitle', '테스트');
            payload.append('picContext', '테스트입니다.');
            payload.append('picArtist', 'winters');
            payload.append('picImage', this.picFile);

            const data = await this.$store.dispatch('uploadPicture', payload);
            console.log(data);
            this.picRes = data['filePath'];
            const resResult = document.getElementById('resResult');
            const resImage = document.createElement('img');
            resImage.src = `${process.env.VUE_APP_BACKEND_URL}/storage/${this.picRes}`;
            resResult.appendChild(resImage);
        },
        changeFile : function(e) {
          this.picFile = e;
          const blobData = this.picSrc.slice();
          this.picBlob = blobData;
          const data = URL.createObjectURL(blobData)
          this.picUploaded = data;
          URL.revokeObjectURL(blobData);
        },
        downloadPic : function(e) {
            e.target.download = this.picSrc.name;
        }
    }
}
</script>

<style>

</style>