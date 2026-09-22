<script setup lang="ts">

//import ref dan onMounted dari Vue
import { ref, onMounted } from "vue";

//import service api
import Api from "../../api";

// Interface Product
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    id_kategori: number;
}

// State products
const products = ref<Product[]>([]);

// Fetch data products dari API
const fetchDataProducts = async () => {
    try {

        //fetch data products dari API
        const response = await Api.get("/api/products");

        //set data products
        products.value = response.data.data;

    } catch (error) {

        //log error
        console.error("Error fetching products:", error);
    }
};

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDataPosts"
    fetchDataProducts();
});

// Handle delete product
const deleteProduct = async (id: number) => {
  try {

    //delete product berdasarkan id
    await Api.delete(`/api/products/${id}`);

    //call method "fetchDataPosts"
    fetchDataProducts();

  } catch (error) {

    //log error
    console.error("Error deleting product:", error);
  }
};
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link to="/products/create" class="btn btn-md btn-success rounded-5 shadow border-0 mb-3">
                    ADD NEW PRODUCT
                </router-link>
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col" style="width: 15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="products.length === 0">
                                    <td colspan="6" class="text-center">
                                        <div class="alert alert-danger mb-0">No data available</div>
                                    </td>
                                </tr>
                                <tr v-for="product in products" :key="product.id">
                    
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.description }}</td>
                                    <td>{{ product.price.toLocaleString('id-ID') }}</td>
                                    <td>{{ product.stock }}</td>
                                    <td class="text-center">
                                        <router-link :to="`/products/edit/${product.id}`"
                                            class="btn btn-sm btn-primary rounded-5 shadow border-0 me-2">
                                            EDIT
                                        </router-link>
                                        <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger rounded-5 shadow border-0"> DELETE
</button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
