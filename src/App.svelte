<script lang="ts">
  import logo from './assets/svelte.png'
  import ZXingReader from './lib/ZXingReader.svelte'
</script>

<main class="container">
  <img src={logo} alt="Svelte Logo" />
  <h1>バーコード読み取りデモ</h1>

  <ZXingReader />

</main>
