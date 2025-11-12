import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		nodePolyfills({
			define: {
				"process.version":"0.0.0",
			  },
			globals: {
			  Buffer: true, // can also be 'build', 'dev', or false
			  global: true,
			  process: true,
			},
			protocolImports: true
		}),
		uni(),
	],
	server: {
		host: '127.0.0.1',
		port: 3001,
		// 是否开启 https
		https: false,
		allowedHosts: ["*"],
		proxy: {
			'/api': {
				target: 'http://magadi.vps24.ko.mrte.top/', 
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				configure: (proxy) => {
					proxy.on('proxyReq', (proxyReq, req, res) => {
						let addr = req.headers.host.split(':'),host=addr[0],port=addr[1];
						//console.log(["headers",req.headers.host]);
						//proxyReq.setHeader('Host', `${host}`)
						//proxyReq.setHeader('X-Real-Port', `${port}`)
						proxyReq.setHeader('referer', `http://${host}`)
						proxyReq.setHeader('origin', `http://${host}`)
					})
				  },
				 //webpark use
				onProxyReq: (proxyReq, req, res) => {
					let host = req.headers.host.split(':')[0]
					console.log(["headers",req.headers]);
					proxyReq.setHeader('Host', `${host}`) 
					proxyReq.setHeader('referer', `http://${host}`) 
					proxyReq.setHeader('origin', `http://${host}`)  
				  }
			
			  }
		}
	},
})