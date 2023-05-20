<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title style="text-align:center;">REGIONS</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar><ion-title style="text-align:center;">REGIONS</ion-title></ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="region in regions" :key="region.code" @click="handleSelectRegion(region)">
          <ion-label>
            <h3>{{ region.regionName }}</h3>
            <p>{{ region.name }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { forRegions, forProvinces } from '@/api';

export default {
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const regions = ref([]);
    const selectedRegion = ref(null);
    const provinces = ref([]);
    const router = useRouter();

    const fetchRegions = async () => {
      regions.value = await forRegions();
    };

    const fetchProvinces = async (regionCode) => {
      provinces.value = await forProvinces(regionCode);
    };

    const handleSelectRegion = (region) => {
      selectedRegion.value = region;
      fetchProvinces(region.code);
      router.push(`/provinces/${region.code}`);
    };

    onMounted(() => {
      fetchRegions();
    });

    const filteredProvinces = computed(() => {
      if (selectedRegion.value) {
        return provinces.value.filter((province) => province.regionCode === selectedRegion.value.code);
      }
      return [];
    });

    return {
      regions,
      selectedRegion,
      filteredProvinces,
      handleSelectRegion,
    };
  },
};
</script>

<style scoped>
body {
  background-color: antiquewhite;
}
</style>