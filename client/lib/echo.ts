import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  wsHost: process.env.NEXT_PUBLIC_WS_HOST || 'localhost',
  wsPort: Number(process.env.NEXT_PUBLIC_WS_PORT) || 6001,
  forceTLS: false,
  disableStats: true,
  encrypted: false,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: process.env.NEXT_PUBLIC_API_URL + '/broadcasting/auth',
  auth: {
    headers: {
      Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : '',
    },
  },
  client: Pusher,
});

export default echo; 