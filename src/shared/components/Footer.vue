<script setup lang="ts">
import { ref } from 'vue'

const emailInput = ref('')
const subscribeSuccess = ref(false)

const handleSubscribe = () => {
  if (emailInput.value.trim() && emailInput.value.includes('@')) {
    subscribeSuccess.value = true
    emailInput.value = ''
    setTimeout(() => {
      subscribeSuccess.value = false
    }, 5000)
  } else {
    alert('Silakan masukkan alamat email yang valid.')
  }
}
</script>

<template>
  <footer class="relative mt-20 w-full overflow-hidden rounded-t-[2.5rem] bg-theme-bg border-t border-theme-glass-border shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-20 transition-colors duration-500">
    
    <!-- Decorative Glowing Blue Gradient Orbs -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-theme-logo-from/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-theme-logo-to/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>
    
    <div class="max-w-7xl mx-auto px-6 pt-16 pb-8 relative">
      
      <!-- Multi-Column Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-theme-glass-border transition-colors duration-500">
        
        <!-- Column 1: Brand & Logo (Spans 4 cols on large screens) -->
        <div class="lg:col-span-4 space-y-6 text-left">
          <div class="flex items-center gap-3">
            <!-- Sleek Gradient Logo Icon -->
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-theme-logo-from to-theme-logo-to flex items-center justify-center shadow-lg shadow-theme-logo-from/20 transition-colors duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-black tracking-tight text-theme-text-primary transition-colors duration-500">Temp<span class="bg-gradient-to-r from-theme-logo-from to-theme-logo-to bg-clip-text text-transparent">Style</span></span>
              <div class="text-[9px] font-bold text-theme-logo-from uppercase tracking-widest leading-none transition-colors duration-500">Weather Fashion</div>
            </div>
          </div>
          
          <p class="text-sm font-semibold text-theme-text-secondary leading-relaxed max-w-sm transition-colors duration-500">
            Smart fashion recommendation based on real-time weather conditions. Always style perfectly, whatever the weather.
          </p>
          
          <!-- Social Icons with Smooth Customized Hover Animation -->
          <div class="flex gap-3">
            <!-- Instagram -->
            <a href="#" class="social-btn group" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <span class="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-lg shadow-pink-500/20"></span>
            </a>
            <!-- TikTok -->
            <a href="#" class="social-btn group" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-text-secondary group-hover:text-theme-text-primary transition-colors fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.19 1.1 1.25 2.65 2.03 4.3 2.18v3.74c-1.8-.08-3.56-.72-5-1.84v6.78c-.06 2.37-1.09 4.67-2.91 6.09-2.03 1.63-4.8 2.21-7.3 1.49-2.47-.68-4.57-2.58-5.38-5.02-.99-2.87-.27-6.2 1.83-8.31 1.76-1.84 4.38-2.61 6.86-1.95v3.83c-1.38-.49-3 .02-3.82 1.19-.87 1.19-.77 2.97.26 4.02 1.01 1.09 2.76 1.25 3.93.36 1-.72 1.46-2 1.43-3.25.02-3.88.01-7.75.01-11.63z"/>
              </svg>
              <span class="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-lg shadow-teal-500/20"></span>
            </a>
            <!-- Twitter -->
            <a href="#" class="social-btn group" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span class="absolute inset-0 rounded-full bg-[#1da1f2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-lg shadow-blue-400/20"></span>
            </a>
            <!-- Pinterest -->
            <a href="#" class="social-btn group" aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-theme-text-secondary group-hover:text-theme-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span class="absolute inset-0 rounded-full bg-[#bd081c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 shadow-lg shadow-red-500/20"></span>
            </a>
          </div>
        </div>
        
        <!-- Column 2: Navigation Menu (Spans 2 cols on large screens) -->
        <div class="lg:col-span-2 space-y-5 text-left">
          <h4 class="text-xs font-bold text-theme-text-primary uppercase tracking-widest border-l-2 border-theme-logo-from pl-3 transition-colors duration-500">Navigation</h4>
          <ul class="space-y-3.5">
            <li><router-link to="/" class="footer-link">Home</router-link></li>
            <li><router-link to="/" class="footer-link">Weather Forecast</router-link></li>
            <li><router-link to="/" class="footer-link">Outfit Recommendation</router-link></li>
            <li><router-link to="/" class="footer-link">AI Stylist</router-link></li>
            <li><router-link to="/" class="footer-link">Trending Fashion</router-link></li>
            <li><router-link to="/" class="footer-link">Contact</router-link></li>
          </ul>
        </div>
        
        <!-- Column 3: Quick Links (Spans 2 cols on large screens) -->
        <div class="lg:col-span-2 space-y-5 text-left">
          <h4 class="text-xs font-bold text-theme-text-primary uppercase tracking-widest border-l-2 border-theme-logo-from pl-3 transition-colors duration-500">Quick Links</h4>
          <ul class="space-y-3.5">
            <li><a href="#" class="footer-link">FAQ</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
            <li><a href="#" class="footer-link">Terms of Service</a></li>
            <li><a href="#" class="footer-link">Support Center</a></li>
            <li><a href="#" class="footer-link">Community</a></li>
          </ul>
        </div>
        
        <!-- Column 4: Newsletter Subscription (Spans 4 cols on large screens) -->
        <div class="lg:col-span-4 space-y-5 text-left">
          <h4 class="text-xs font-bold text-theme-text-primary uppercase tracking-widest border-l-2 border-theme-logo-from pl-3 transition-colors duration-500">Get Updates</h4>
          <p class="text-sm font-semibold text-theme-text-secondary leading-relaxed transition-colors duration-500">
            Dapatkan update trend pakaian dan analisis cuaca mingguan langsung ke email Anda.
          </p>
          
          <!-- Glassmorphism Subscription Form -->
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <div class="flex flex-col sm:flex-row gap-2 relative">
              <input 
                v-model="emailInput"
                type="email" 
                placeholder="Alamat email Anda..." 
                required
                class="flex-1 px-4 py-3 text-sm bg-theme-glass-bg border border-theme-glass-border backdrop-blur-md rounded-xl text-theme-text-primary placeholder-theme-text-secondary outline-none focus:border-theme-logo-from/50 focus:ring-1 focus:ring-theme-logo-from/30 transition-colors duration-500 font-semibold"
              />
              <button 
                type="submit"
                class="px-5 py-3 rounded-xl bg-gradient-to-r from-theme-logo-from to-theme-logo-to text-white font-bold text-xs tracking-wider uppercase border border-theme-glass-border hover:shadow-lg hover:shadow-theme-logo-from/25 active:scale-95 transition-all shadow-md"
              >
                Subscribe
              </button>
            </div>
            
            <!-- Success Message Notification -->
            <transition name="fade">
              <div v-if="subscribeSuccess" class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Terima kasih! Anda sukses terdaftar untuk tren outfit terpopuler!</span>
              </div>
            </transition>
          </form>
        </div>
        
      </div>
      
      <!-- Bottom Section (Copyright & Divider) -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs font-semibold text-theme-text-secondary opacity-80 transition-colors duration-500">
          &copy; 2026 Weather Outfit. All rights reserved.
        </p>
        <div class="flex items-center gap-4 text-xs font-bold text-theme-text-secondary opacity-80 transition-colors duration-500">
          <a href="#" class="hover:text-theme-text-primary transition-colors">Syarat Ketentuan</a>
          <span class="text-theme-text-secondary opacity-50">&bull;</span>
          <a href="#" class="hover:text-theme-text-primary transition-colors">Keamanan Privasi</a>
        </div>
      </div>
      
    </div>
  </footer>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.social-btn {
  @apply w-10 h-10 rounded-full border border-theme-glass-border bg-theme-glass-bg flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm;
}

.footer-link {
  @apply text-sm font-semibold text-theme-text-secondary hover:text-theme-text-primary transition-colors relative pb-1;
}

.footer-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-[1.5px] bg-theme-logo-from transition-all duration-300;
}

.footer-link:hover::after {
  @apply w-full;
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
