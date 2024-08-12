<script setup lang="ts">
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/authSore';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();

interface User {
  name: string;
  email: string;
}

// Initialize `user` as a ref with an initial empty object
const user = ref<User | null>(null);

const checkAuth = async () => {
  // Assuming `authStore.user_info` is of type `User`
  user.value = authStore.user_info || null; 
};

onMounted(() => {
  checkAuth();
});
</script>

<template>
  <div class="flex p-40 flex-col items-center">
    <div class="details mb-5" v-if="user">
      Name: {{ user.name }}<br>
      Email: {{ user.email }}
    </div>
    <div>
      <Button @click="authStore.logOut()">Logout</Button>
    </div>
  </div>
</template>
