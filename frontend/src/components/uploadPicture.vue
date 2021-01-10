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
                  id="uploadedImage"
                  type="file"
                  accept="image/*"
                  label="Picture"
                  v-model="picSrc"
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
import axios from 'axios'

export default {
    name : 'UploadPicture',
    data() {
        return {
            picTitle : null,
            picContext : null,
            picGenere : null,
            picBlob : null,
            picSrc : null,
            picWidth : null,
            picHeight : null,
            picUploaded : null,
        }
    },
    methods : {
        submitPic : async function(e) {
            e.stopPropagation();
            e.preventDefault();
            const image = document.getElementById('uploadedImage');
            let payload = new FormData();
            payload.append('picTitle', '테스트');
            payload.append('picContext', '테스트입니다.');
            payload.append('picArtist', 'winters');
            payload.append('picImage', image.files[0]);
            await axios.post('http://localhost:8000/api/pictures', payload, {
              headers : {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        },
        changeFile : function() {
          const blobData = this.picSrc.slice();
          this.picBlob = blobData;
          const data = URL.createObjectURL(blobData)
          this.picUploaded = data;
          URL.revokeObjectURL(blobData);
        },
        downloadPic : function(e) {
            e.target.download = this.picSrc.name;
        }
    },
}
</script>

<style>

</style>