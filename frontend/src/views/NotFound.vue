<template>
  <div id="notfound">
    <div class="d-inline-block text-center" id="notfound-box">
      <p class="notfound-text" id="notfound-upper-text">잘못된 경로입니다.</p>
      <img id="notfound-image" :src="require('@/assets/images/NotFound.png')" />
      <p class="notfound-text" id="notfound-lower-text">{{countdown}}초 후에 메인 페이지로 이동합니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name : 'NotFound',
  data() {
      return {
          countdown : null,
          timer : setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown = this.countdown-1;
                if (this.countdown === 0) {
                    this.endCount();
                }
                }},1000),
      }
  },
  methods : {
      startCount : function() {
        this.countdown = 5;
        this.timer;
      },
      endCount : function() {
          clearInterval(this.timer);
          this.$router.push({'name' : 'Index'});
      }
  },
  created() {
      this.countdown = 5;
      this.startCount();
  }
}
</script>

<style scoped>
#notfound {
    text-align: center;
}

#notfound-box {
    margin-top: 1rem;
    background-color: #6464ff;
    border: ridge 4mm #9696ff;
    padding: 10px;
}

@keyframes shout {
    to {
        transform: scale(0.9);
    }

    from {
        transform: scale(1);
    }
}

#notfound-image {
    position: relative;
    width: 80%;
    height: auto;
    animation: shout 0.5s alternate-reverse forwards infinite;
}

@font-face {
    font-family: 경기천년제목;
    src: local(경기천년제목);
    src: url('../assets/fonts/경기천년제목_Bold.ttf');
}

.notfound-text {
    color: white;
    font-family: 경기천년제목;
}

#notfound-upper-text {
    font-size: 3rem;
    margin-top: 1rem;
}

#notfound-lower-text {
    font-size: 2rem;
}
</style>