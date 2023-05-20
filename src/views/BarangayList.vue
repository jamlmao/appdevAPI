<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/regions"></ion-back-button>
                </ion-buttons>
                <ion-title style="text-align:center;">
                    {{ selectedMunicipality ? selectedMunicipality.name : '' }} Barangays
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-list>
                <ion-item v-for="barangay in filteredBarangays" :key="barangay.code" @click="handleSelectBarangay(barangay)"
                    button href="/pl">
                    <ion-label>
                        <h3>{{ barangay.name }}</h3>

                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { forBarangays, forMunicipalities } from "@/api";

export default {
    components: {
        IonBackButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonItem,
        IonLabel,
        IonList,
        IonPage,
        IonTitle,
        IonToolbar,
    },
    setup() {
        const selectedMunicipality = ref(null);
        const selectedBarangay = ref('');
        const barangays = ref([]);
        const router = useRouter();

        const fetchBarangays = async (municipalityCode) => {
            barangays.value = await forBarangays(municipalityCode);
        };

        onMounted(async () => {
            const provinceCode = router.currentRoute.value.params.provinceCode;
            const municipalityCode = router.currentRoute.value.params.municipalityCode;
            const municipalities = await forMunicipalities(provinceCode);
            selectedMunicipality.value = findMunicipalityByCode(municipalityCode, municipalities);
            fetchBarangays(municipalityCode);
        });

        const findMunicipalityByCode = (municipalityCode, municipalities) => {
            if (Array.isArray(municipalities)) {
                return municipalities.find((municipality) => municipality.code === municipalityCode);
            }
            return null;
        };

        const filteredBarangays = computed(() => {
            if (selectedMunicipality.value) {
                return barangays.value.filter((barangay) => barangay.municipalityCode === selectedMunicipality.value.code);
            }
            return [];
        });

        const handleSelectBarangay = (barangay) => {
            selectedBarangay.value = barangay.name;
            router.push(
                `/provinces/${selectedMunicipality.value.provinceCode}/municipalities/${selectedMunicipality.value.code}/barangays/${barangay.code}`
            );
        };

        return {
            selectedMunicipality,
            selectedBarangay,
            filteredBarangays,
            handleSelectBarangay,
        };
    },
};
</script>