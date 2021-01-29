<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="mediaList !== undefined" class="MediaList">
      <MediaCard v-for="media in mediaList.media" :key="media.id" :media="media" />
    </div>
    <div v-if="mediaList !== undefined" class="PageButtons">
      <div v-on:click="handlePageClick('backward')" class="pageBtn">
        <font-awesome-icon icon="chevron-left" />
      </div>
      {{ $route.params.pageNum }}
      <div v-on:click="handlePageClick('forward')" class="pageBtn">
        <font-awesome-icon icon="chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import MediaCard from "./MediaCard.vue";

export default {
  components: { MediaCard },
  created() {
    console.log(this);
  },
  updated() {
    this.pageNum = this.$route.params.pageNum;
  },
  data() {
    return {
      mediaList: undefined,
      pageNum: this.$route.params.pageNum,
    };
  },
  methods: {
    handlePageClick(direction) {
      if (direction === "forward" && this.mediaList.pageInfo.hasNextPage) {
        // this.$apollo.queries.mediaList.setVariables({
        //   pageNum: parseInt(this.pageNum) + 1,
        // });
        this.mediaList = undefined;
        this.$router.push(`/${parseInt(this.pageNum) + 1}`);
      } else if (direction === "backward" && parseInt(this.pageNum) > 1) {
        // this.$apollo.queries.mediaList.setVariables({
        //   pageNum: parseInt(this.pageNum) - 1,
        // });
        this.mediaList = undefined;
        this.$router.push(`/${parseInt(this.pageNum) - 1}`);
      }
    },
  },
  apollo: {
    mediaList: {
      query: gql`
        query($page: Int) {
          Page(page: $page, perPage: 10) {
            pageInfo {
              hasNextPage
            }
            media(type: ANIME, sort: TRENDING_DESC) {
              id
              title {
                english
                native
                romaji
              }
              coverImage {
                large
              }
              status
              genres
            }
          }
        }
      `,
      variables() {
        return { page: this.pageNum };
      },
      update: (data) => data.Page,
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

.MediaList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.PageButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
}

.pageBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #2b2d42;
  margin: 1rem;
  border-radius: 40px;
  z-index: 100;
  width: 40px;
  height: 40px;
  background-color: #edf2f4;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.pageBtn:hover {
  cursor: pointer;
}
</style>
