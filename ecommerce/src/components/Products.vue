<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import axios from "axios";
const products = ref([]);

function getSlug(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

onBeforeMount(() => {
  axios
    .get("http://localhost:8000/api/products")
    .then((res) => {
      products.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<template>
  <article class="mb-10" v-for="product in products" :key="product.id">
    <h1 class="text-xl mb-2">
      <!-- <router-link :to="{ name: 'product', params: { id: getSlug(product.title) } }">{{ product.title }}</router-link> -->
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h1>
    <p>
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        <img
          :src="`//source.unsplash.com/random/300x200?${product.id}`"
          alt=""
        />
      </router-link>
      {{ product.body }}
    </p>
  </article>
</template>

<style></style>
