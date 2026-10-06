<script setup lang="ts">
import { useRouter } from "vue-router";
import Api from "./api";
import { isLoggedIn, clearToken } from "./auth";

const router = useRouter();

const logout = async () => {
    try {
        await Api.post("/api/auth/logout");
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        clearToken();
        router.push({ name: "login" });
    }
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">HOME</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/products" class="nav-link active" aria-current="page">PRODUCTS</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <template v-if="isLoggedIn">
              <li class="nav-item">
                <button @click="logout" class="btn btn-danger">LOGOUT</button>
              </li>
            </template>
            <template v-else>
              <li class="nav-item me-2">
                <router-link to="/login" class="btn btn-success">LOGIN</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="btn btn-outline-light">REGISTER</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>