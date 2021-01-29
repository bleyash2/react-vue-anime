<template>
  <div v-if="mediaInfo" class="mediaView">
    <div class="BackBtn" v-on:click="handleGoBack"><font-awesome-icon icon="chevron-left" /></div>
    <div class="banner">
      <img :src="mediaInfo.bannerImage" alt="" />
    </div>
    <div class="content">
      <div class="coverImage">
        <img :src="mediaInfo.coverImage.large" alt="" />
        <div class="genres">
          <div v-for="(genre, i) in mediaInfo.genres" v-bind:key="i" class="genreBadge">
            {{ genre }}
          </div>
        </div>
      </div>
      <div class="words">
        <div class="title">
          {{ mediaInfo.title | displayTitle }}
          <div class="status">{{ `${mediaInfo.status}` }}</div>
        </div>
        <div class="subtitle">{{ mediaInfo.title.native }}</div>
        <div class="description" v-html="mediaInfo.description"></div>
      </div>
    </div>
  </div>
  <div v-else class="mediaView">
    <div class="bannerSkeleton"></div>
    <div class="content">
      <div class="coverImageSkeleton">
        <div class="genres"></div>
      </div>
      <div class="words">
        <div class="titleSkeleton"></div>
        <div class="subtitleSkeleton"></div>
        <div class="descriptionSkeleton"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      id: this.$route.params.id,
      mediaInfo: undefined,
    };
  },
  created() {
    console.log(this);
  },
  updated() {
    console.log(this);
  },
  filters: {
    displayTitle: (title) => {
      const { english, romaji } = title;
      return english !== null ? english : romaji;
    },
  },
  methods: {
    handleGoBack: function() {
      this.$router.back();
    },
  },
  apollo: {
    mediaInfo: {
      query: gql`
        query($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              english
              native
              romaji
            }
            coverImage {
              large
            }
            bannerImage
            description(asHtml: true)
            status
            genres
            averageScore
          }
        }
      `,
      variables() {
        return { id: this.id };
      },
      update: (data) => data.Media,
    },
  },
};
</script>

<style scoped>
@keyframes skeleton {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.mediaView {
  height: 100vh;
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: #2b2d42;
  color: #edf2f4;
}

.mediaView .banner {
  width: 100%;
  min-height: 100px;
  display: flex;
  overflow: hidden;
  z-index: 1;
}

.bannerSkeleton {
  min-height: 300px;
  display: flex;

  z-index: 1;
  background-color: #8d99ae;
  animation: skeleton 1s ease-in-out alternate infinite;
}

.mediaView .banner img {
  object-fit: cover;
  width: 100%;
}

.mediaView .content {
  display: flex;
  flex-direction: row;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -14px 22px;
  z-index: 5;
  flex-grow: 1;
}

.mediaView .coverImage {
  transform: translateY(-70px);
  margin: 1rem;
}

.mediaView .coverImage img {
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 6;
}

.mediaView .coverImageSkeleton {
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 6;
  transform: translateY(-70px);
  margin: 1rem;
  width: 230px;
  height: 325px;
  background-color: #edf2f4;
  animation: skeleton 1s ease-in-out alternate infinite;
}

.mediaView .words {
  display: flex;
  flex-direction: column;
  min-width: 250px;
}

.mediaView .title {
  margin-top: 1rem;
  font-weight: 400;
  font-size: large;
  flex-direction: row;
  display: flex;
}

.mediaView .titleSkeleton {
  border-radius: 5px;
  margin-top: 1rem;
  width: 500px;
  height: 50px;
  background-color: #edf2f4;
  animation: skeleton 1s ease-in-out alternate infinite;
}

.mediaView .subtitle {
  font-weight: 300;
  color: #8d99ae;
}

.mediaView .status {
  margin-left: 5px;
  background-color: green;
  font-weight: 300;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 0.15rem;
  justify-content: space-around;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 14px;
}

.mediaView .description {
}

.mediaView .genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.genreBadge {
  margin: 5px;
  background-color: #ef233c;
  font-weight: 300;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 0.15rem;
  justify-content: space-around;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 14px;
}

.BackBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #2b2d42;
  position: absolute;
  margin: 1rem;
  border-radius: 40px;
  z-index: 100;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background-color: #edf2f4;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.BackBtn:hover {
  cursor: pointer;
}
</style>
