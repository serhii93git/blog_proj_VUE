<template>
  <div v-if="loading">
    <p>Завантаження профілю...</p>
  </div>
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else class="user-profile">
    <div class="profile-header">
      <img v-if="user.creator_image" :src="user.creator_image" alt="Creator Image" class="creator-image" />
      <h1>{{ user.username }}</h1>
    </div>
    <div class="profile-details">
      <p class="user-info"><strong>Ім'я:</strong> {{ user.first_name }}</p>
      <p class="user-info"><strong>Прізвище:</strong> {{ user.last_name }}</p>
      <p class="user-info"><strong>Електронна пошта:</strong> {{ user.email }}</p>
      <p class="user-info"><strong>Дата приєднання:</strong> {{ new Date(user.date_joined).toLocaleString() }}</p>
    </div>
    <div class="edit-btn">
      <router-link :to="`/edit/${user.id}`">
        <button>Редагувати</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.fetchUser();
    });

    return {
      user: computed(() => userStore.user),
      loading: computed(() => userStore.loading),
      error: computed(() => userStore.error)
    };
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.profile-header {
  position: relative;
  margin-bottom: 20px;
}

.creator-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #007bff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.profile-details {
  text-align: left;
  margin: 0 auto;
  max-width: 600px;
}

.user-info {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.user-info strong {
  color: #007bff;
}

.edit-btn {
  margin-top: 30px;
}

.edit-btn button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.edit-btn button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
