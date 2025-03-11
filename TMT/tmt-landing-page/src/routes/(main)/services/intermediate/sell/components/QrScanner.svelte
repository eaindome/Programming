<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    // Props
    export let onScan: (code: string) => void;
    
    // State
    let scanning = false;
    let videoElement: HTMLVideoElement;
    let canvasElement: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D | null = null;
    let scanInterval: number;
    
    // Methods
    async function startScanner() {
      try {
        scanning = true;
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.setAttribute('playsinline', 'true'); // Required for iOS
          videoElement.play();
          
          scanInterval = window.setInterval(scanQRCode, 500);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        scanning = false;
      }
    }
    
    function stopScanner() {
      scanning = false;
      
      if (scanInterval) {
        clearInterval(scanInterval);
      }
      
      if (videoElement && videoElement.srcObject) {
        const tracks = (videoElement.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    }
    
    function scanQRCode() {
      if (videoElement && canvasContext && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        // Draw video frame to canvas
        canvasElement.height = videoElement.videoHeight;
        canvasElement.width = videoElement.videoWidth;
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        
        // In a real implementation, you would use a QR code scanning library here
        // Since we can't actually scan codes in this demo, we'll simulate finding a code
        simulateQRScan();
      }
    }
    
    function simulateQRScan() {
      // For demo purposes, we'll simulate finding a random medication QR code
      // In a real app, you would use a library like jsQR
      const codes = [
        'AMX500-BT2023-045',
        'LIS10-BT2023-112',
        'MET850-BT2023-078'
      ];
      
      // Simulating a successful scan after a few seconds (for demo purposes)
      setTimeout(() => {
        if (scanning) {
          const randomCode = codes[Math.floor(Math.random() * codes.length)];
          stopScanner();
          onScan(randomCode);
        }
      }, 3000);
    }
    
    onMount(() => {
      if (canvasElement) {
        canvasContext = canvasElement.getContext('2d');
      }
      startScanner();
    });
    
    onDestroy(() => {
      stopScanner();
    });
  </script>
  
  <div class="qr-scanner">
    <div class="relative">
      <video 
        bind:this={videoElement}
        class="w-full h-64 object-cover rounded-lg bg-black"
      >
        <track kind="captions" srclang="en" label="English captions" default>
      </video>
      
      <canvas bind:this={canvasElement} class="hidden"></canvas>
      
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-48 h-48 border-2 border-[#56C271] rounded-lg opacity-70"></div>
      </div>
      
      {#if scanning}
        <div class="absolute bottom-4 left-0 right-0 text-center">
          <div class="inline-flex items-center px-4 py-2 bg-black bg-opacity-50 text-white rounded-full">
            <div class="animate-pulse mr-2 w-3 h-3 rounded-full bg-[#56C271]"></div>
            Scanning for medication QR code...
          </div>
        </div>
      {/if}
    </div>
    
    <div class="flex justify-between mt-4">
      <button 
        on:click={stopScanner}
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
      
      <button 
        on:click={startScanner}
        class="px-4 py-2 bg-[#1A5F7A] text-white rounded-md hover:bg-opacity-90"
        disabled={scanning}
      >
        {scanning ? 'Scanning...' : 'Restart Scan'}
      </button>
    </div>
  </div>