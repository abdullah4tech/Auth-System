<script setup lang="ts">
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/authSore';
import { onMounted, ref } from 'vue';


const authStore = useAuthStore()
const user = ref([])

const checkAuth = async () => {
  user.value = authStore.user_info
}


onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="flex p-40 flex-col items-center">
    <div class="details mb-5">
      Name: {{ user.name }}<br> 
      Email: {{ user.email }}
    </div>
    <div>
      <Button @click="authStore.logOut()">Logout</Button>
    </div>
  </div>
</template>