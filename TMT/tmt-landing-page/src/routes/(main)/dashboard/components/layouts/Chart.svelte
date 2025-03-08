<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    
    export let type: 'line' | 'bar' | 'pie' | 'doughnut' = 'line';
    export let data: any;
    export let options: any = {};
    export let height: string = '300px';
    
    let canvas: HTMLCanvasElement;
    let chart: Chart;
    
    onMount(() => {
      chart = new Chart(canvas, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...options
        }
      });
    });
    
    onDestroy(() => {
      if (chart) {
        chart.destroy();
      }
    });
    
    $: if (chart && data) {
      chart.data = data;
      chart.update();
    }
</script>
  
<div style="height: {height}">
    <canvas bind:this={canvas}></canvas>
</div>