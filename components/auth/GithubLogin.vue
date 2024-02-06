<template>
  <UButton icon="i-grommet-icons-github" color="primary" size="xl" @click="loginWithGithub" />
</template>
<script lang="ts" setup>
import type { Database } from '~/types/supabase';

const client = useSupabaseClient<Database>();
const loginWithGithub = async () => {
  await client.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: '/dashboard' },
  });
};
</script>
