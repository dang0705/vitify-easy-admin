<script setup>
  import { start } from 'qiankun';
  import { onMounted } from 'vue';
  onMounted(() => {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  });
</script>
