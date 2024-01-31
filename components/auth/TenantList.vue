<template>
  <div>
    <template v-for="userTenant in userTenants" :key="userTenant.km_tenant.id">
      <UTooltip :text="userTenant.km_tenant.name">
        <UButton
          :icon="
            userTenant.km_tenant.favicon_path
              ? userTenant.km_tenant.favicon_path
              : userTenant.km_tenant.tenant_type === 'personal'
                ? 'i-heroicons-user-solid'
                : 'i-heroicons-building-office-2'
          "
          color="primary"
          square
          :variant="currentUserTenant.id === userTenant.id ? 'outline' : 'ghost'"
          @click="() => userTenantsStore.setCurrentUserTenant(userTenant)"
        />
      </UTooltip>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useUserTenantsStore } from '~/stores/useUserTenantsStore';

const userTenantsStore = useUserTenantsStore();
const userTenants = computed(() => userTenantsStore.userTenants);
const currentUserTenant = computed(() => userTenantsStore.currentUserTenant);
</script>
