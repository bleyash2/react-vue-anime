<template>
  <div v-show="media" v-on:click="handleCardClick()" class="mediaCard">
    <div class="coverImage">
      <div class="overlay">
        <div>{{ media.status }}</div>
        <div>
          <div v-for="genre in media.genres" :key="media.id + '-' + genre">{{ genre }}</div>
        </div>
      </div>
      <img v-bind:src="media.coverImage.large" alt="" />
    </div>
    <h4>{{ media.title | displayTitle }}</h4>
    <h5>{{ media.title.native }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      id: Number,
      title: {
        english: String,
        native: String,
        romaji: String,
      },
      coverImage: {
        large: String,
      },
      status: String,
      genres: [String],
    },
  },
  methods: {
    handleCardClick: function() {
      this.$router.push(`/title/${this.$props.media.id}`);
    },
  },
  filters: {
    displayTitle: (title) => {
      const { english, romaji } = title;
      return english !== null ? english : romaji;
    },
  },
};
</script>

<style scoped>
.mediaCard {
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  margin: 1rem;
}

.mediaCard .coverImage {
  width: 230px;
  height: 325px;
  margin-bottom: 0.25rem;
}

.mediaCard .coverImage img {
  width: 230px;
  height: 325px;
  border-radius: 5px;
}

.mediaCard .coverImage .overlay {
  border-radius: 5px;
  width: 230px;
  height: 325px;
  position: absolute;
  background-color: #d90429;
  color: #edf2f4;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.mediaCard .coverImage .overlay:hover {
  opacity: 0.75;
  cursor: pointer;
}

.mediaCard h4 {
  width: 230px;
  margin: 0;
  font-weight: 300;
  font-size: 12px;
}

.mediaCard h5 {
  width: 230px;
  margin: 0;
  font-weight: 300;
  font-size: 10px;
  color: #8d99ae;
}
</style>
