<script>

    import Listing from '../lib/components/listing.svelte';
  </script>
  
  <div class="home-wrapper">
    <h1>Welcome to the Shop</h1>
    <p class="subheading">Browse our current listings below </p>
  </div>
    
  
  <Listing />

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
  
    * {
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  
    body {
      background: #f0f4f8;
    }
  
    .home-wrapper {
      padding: 2rem;
      max-width: 1200px;
      margin: auto;
      text-align: center;
      background-color: #f9fbfd;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #1a202c;
    }
  
    .subheading {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: #4a5568;
    }
  </style>