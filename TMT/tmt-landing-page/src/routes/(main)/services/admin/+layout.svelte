<script lang="ts">
    import Sidebar from './components/Sidebar.svelte';
    import Header from './components/Header.svelte';
    import '../../../app.css';
    
    export let data: { user: any };
    let sidebarOpen = false;
    
    function toggleSidebar() {
      sidebarOpen = !sidebarOpen;
    }
</script>
  
<div class="flex h-screen bg-[#F9FAFB]">
    <Sidebar {sidebarOpen} {data} />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header {toggleSidebar} user={data.user} />
      
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot />
      </main>
    </div>
</div>