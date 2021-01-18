<template>
  <v-container>
    <v-row>
        <v-spacer></v-spacer>
        <div class="gallery-radiobox" v-if="isLogin">
            <v-radio-group v-model="checkValue">
              <v-radio class="d-inline-block mx-3 gallery-checkbox" v-for="(box, index) in loginRadioboxList" :key="index" color="indigo"
              :label="box.label" :value="box.value" @click="pictureListSort" />
            </v-radio-group>
        </div>
        <div class="gallery-radiobox" v-else>
            <v-radio-group v-model="checkValue">
              <v-radio class="d-inline-block mx-3 gallery-checkbox" v-for="(box, index) in logoutRadioboxList" :key="index" color="indigo"
              :label="box.label" :value="box.value" @click="pictureListSort" />
            </v-radio-group>
        </div>
    </v-row>
    <v-row>
      <v-col class="gallery-wrapper" cols=3 v-for="(picture, index) in pictureList" :key="index">
        <img
        class="gallery-picture"
        :src="`${dbURL}/storage/${picture.filePath}`"
        :alt="picture.picTitle"
        :title="picture.picTitle"
        @click="pictureCountUp(picture)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

import { isLogin } from '@/utils/index'

export default {
    name : 'Gallery',
    data() {
        return {
            dbURL : process.env.VUE_APP_BACKEND_URL,
            latestPictureList : null,
            userLikePictureList : null,
            pictureList : null,
            checkValue : 'Latest',
            loginRadioboxList : [
                {
                    label : 'Latest',
                    value : 'Latest'
                },
                {
                    label : 'Popular',
                    value : 'Popular'
                },
                {
                    label : 'Like',
                    value : 'Like',
                }
            ],
            logoutRadioboxList : [
                {
                    label : 'Latest',
                    value : 'Latest'
                },
                {
                    label : 'Popular',
                    value : 'Popular'
                },
            ],
        }
    },

    props : [
        'user'
    ],

    methods : {
        ...mapActions['getPictures', 'updateClickCount'],
        pictureCountUp : async function(picture) {
            await this.$store.dispatch('updateClickCount', picture._id);
            this.$router.push({ 'name' : 'PictureDetail', params : { 'picture' : picture } });
        },
        pictureListSort : function() {
        switch(this.checkValue) {
            case 'Latest':
                this.pictureList = this.latestPictureList;
                this.pictureList.sort((a,b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
                break;
            case 'Popular':
                this.pictureList = this.latestPictureList;
                this.pictureList.sort((a,b) => b.clickCount - a.clickCount);
                break;
            case 'Like':
                this.pictureList = this.userLikePictureList;
                this.pictureList.sort((a,b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
                break;
            default:
                break;
          }
        }
    },

    computed : {
        isLogin : isLogin,
    },

    async created() {
        if (this.user === 'None') {
            this.latestPictureList = await this.$store.dispatch('getPictures', { userNickname : null, limit : 28 });
        } else {
            this.latestPictureList = await this.$store.dispatch('getPictures', { userNickname : null, limit : 28 });
            this.userLikePictureList = await this.$store.dispatch('getPictures', { userNickname : this.user.userNickname, limit : 28 });
        }
        this.pictureList = this.latestPictureList;
    },
    updated() {
        switch(this.checkValue) {
        case 'Latest':
            this.pictureList = this.latestPictureList;
            break;
        case 'Popular':
            this.pictureList = this.latestPictureList;
            break;
        case 'Like':
            this.pictureList = this.userLikePictureList;
            break;
        default:
            break;
        }
    }
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

.gallery-radiobox {
    font-family: 'Do Hyeon', sans-serif;
    font-size: 0.8rem;
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