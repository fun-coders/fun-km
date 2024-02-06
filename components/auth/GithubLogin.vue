<template>
  <UTooltip text="Github">
    <UButton icon="i-grommet-icons-github" color="primary" size="xl" @click="loginWithGithub" />
  </UTooltip>
</template>
<script lang="ts" setup>
import type { Database } from '~/types/supabase';

const client = useSupabaseClient<Database>();
const loginWithGithub = async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'github',
  });
  console.log('client', data, error);
};
</script>
