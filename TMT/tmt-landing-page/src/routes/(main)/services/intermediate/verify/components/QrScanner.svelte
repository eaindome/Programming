<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    
    const dispatch = createEventDispatcher();
    let videoElement: HTMLVideoElement;
    let canvasElement: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D | null;
    let stream: MediaStream | null = null;
    
    // Simulates QR code scanning with random result after a delay
    function simulateScan() {
      setTimeout(() => {
        // For demo purposes, simulate a successful scan with a random batch number
        const randomBatch = Math.random() > 0.5 
          ? 'TMT12345678'  // Known good batch
          : `TMT${Math.floor(Math.random() * 90000000) + 10000000}`; // Random batch
          
        dispatch('result', randomBatch);
      }, 2500);
    }
    
    onMount(async () => {
      canvasContext = canvasElement.getContext('2d');
      
      try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.play();
        }
        
        // Start scanning simulation when video is playing
        videoElement.onplaying = () => {
          simulateScan();
          
          // Draw scanning animation
          const scanInterval = setInterval(() => {
            if (canvasContext && videoElement) {
              canvasElement.width = videoElement.videoWidth;
              canvasElement.height = videoElement.videoHeight;
              
              // Draw video frame
              canvasContext.drawImage(
                videoElement, 
                0, 0, 
                videoElement.videoWidth, 
                videoElement.videoHeight
              );
              
              // Draw scanning line
              const lineY = (Date.now() % 2000) / 2000 * videoElement.videoHeight;
              canvasContext.strokeStyle = '#56C271';
              canvasContext.lineWidth = 4;
              canvasContext.beginPath();
              canvasContext.moveTo(0, lineY);
              canvasContext.lineTo(videoElement.videoWidth, lineY);
              canvasContext.stroke();
              
              // Draw corner markers
              const cornerSize = Math.min(videoElement.videoWidth, videoElement.videoHeight) * 0.1;
              canvasContext.strokeStyle = '#1A5F7A';
              canvasContext.lineWidth = 8;
              
              // Top-left corner
              canvasContext.beginPath();
              canvasContext.moveTo(0, cornerSize);
              canvasContext.lineTo(0, 0);
              canvasContext.lineTo(cornerSize, 0);
              canvasContext.stroke();
              
              // Top-right corner
              canvasContext.beginPath();
              canvasContext.moveTo(videoElement.videoWidth - cornerSize, 0);
              canvasContext.lineTo(videoElement.videoWidth, 0);
              canvasContext.lineTo(videoElement.videoWidth, cornerSize);
              canvasContext.stroke();
              
              // Bottom-left corner
              canvasContext.beginPath();
              canvasContext.moveTo(0, videoElement.videoHeight - cornerSize);
              canvasContext.lineTo(0, videoElement.videoHeight);
              canvasContext.lineTo(cornerSize, videoElement.videoHeight);
              canvasContext.stroke();
              
              // Bottom-right corner
              canvasContext.beginPath();
              canvasContext.moveTo(videoElement.videoWidth - cornerSize, videoElement.videoHeight);
              canvasContext.lineTo(videoElement.videoWidth, videoElement.videoHeight);
              canvasContext.lineTo(videoElement.videoWidth, videoElement.videoHeight - cornerSize);
              canvasContext.stroke();
            }
          }, 50);
          
          return () => clearInterval(scanInterval);
        };
        
      } catch (error) {
        console.error('Error accessing camera:', error);
        // Fallback to simulation without camera
        simulateScan();
      }
    });
    
    onDestroy(() => {
      // Stop all tracks when component is destroyed
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
</script>
  
<div class="relative w-full h-full">
    <video
      bind:this={videoElement}
      class="absolute inset-0 w-full h-full object-cover rounded-lg"
      autoplay
      muted
      playsinline
    ></video>
    <canvas 
      bind:this={canvasElement}
      class="absolute inset-0 w-full h-full object-cover rounded-lg"
    ></canvas>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="animate-pulse text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
        Scanning...
      </div>
    </div>
</div>