<script setup lang="ts">

//import ref dan onMounted dari vue
import { ref, onMounted } from "vue";

//import useRoute dan useRouter dari vue-router
import { useRoute, useRouter } from "vue-router";

//import Api dari folder api
import Api from "../../api";

// Interface Errors
interface Errors {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    id_kategori?: string[];
}

// State untuk form
const name = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");
const id_kategori = ref("");

// State errors
const errors = ref<Errors>({});

//initiate route and router
const route = useRoute();
const router = useRouter();

// Fetch product details
const fetchDetailProduct = async () => {
    try {
        //fetch data product berdasarkan id
        const response = await Api.get(`/api/products/${route.params.id}`);

        //set data ke state (DIBENARKAN: id_kategori.value)
        name.value = response.data.data.name;
        description.value = response.data.data.description;
        price.value = response.data.data.price;
        stock.value = response.data.data.stock;
        id_kategori.value = response.data.data.id_kategori;

    } catch (error) {
        //log error
        console.error("Error fetching product:", error);
    }
};

//run hook "onMounted"
onMounted(() => {
    //call method "fetchDetailProduct"
    fetchDetailProduct();
});

// Handle form submission
const updateProduct = async () => {

    //initiate form data
    const formData = new FormData();

    //append data to form data (DIBENARKAN: "title" diganti "name")
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("id_kategori", id_kategori.value);
    formData.append("_method", "PUT");

    try {
        //send data to api
        await Api.post(`/api/products/${route.params.id}`, formData);

        //redirect to products page
        router.push("/products");

    } catch (error: any) {
        //set error to state
        errors.value = error.response.data.errors || error.response.data;
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <form @submit.prevent="updateProduct">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Title Product" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Description</label>
                                <textarea v-model="description" class="form-control" rows="5"
                                    placeholder="Description Product"></textarea>
                                <div v-if="errors.description" class="alert alert-danger mt-2">
                                    {{ errors.description[0] }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Price</label>
                                        <input type="number" v-model="price" class="form-control"
                                            placeholder="Price Product" />
                                        <div v-if="errors.price" class="alert alert-danger mt-2">
                                            {{ errors.price[0] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Stock</label>
                                        <input type="number" v-model="stock" class="form-control"
                                            placeholder="Stock Product" />
                                        <div v-if="errors.stock" class="alert alert-danger mt-2">
                                            {{ errors.stock[0] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">id_kategori</label>
                                        <input type="number" v-model="id_kategori" class="form-control"
                                            placeholder="ID Kategori" />
                                        <div v-if="errors.id_kategori" class="alert alert-danger mt-2">
                                            {{ errors.id_kategori[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-5 shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>