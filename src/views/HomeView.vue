<script setup lang="ts">
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/authSore';
import { onMounted, ref } from 'vue';
import { Loader2 } from 'lucide-vue-next';

const authStore = useAuthStore();

interface User {
  name: string;
  email: string;
}

// Initialize `user` as a ref with an initial empty object
const user = ref<User | null>(null);

const loading = ref(false)

const checkAuth = async () => {
  // Assuming `authStore.user_info` is of type `User`
  user.value = authStore.user_info || null; 
};

const signOut = () => {
  loading.value = true
  authStore.logOut()
}

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
      <Button @click="signOut">
        <div v-if="loading" class="flex">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Please wait
        </div>
        <div v-else>
          Logout
        </div>
      </Button>
    </div>
  </div>
</template>
