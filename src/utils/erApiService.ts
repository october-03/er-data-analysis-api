import axios from 'axios';

export default axios.create({
  baseURL: 'https://open-api.bser.io',
  headers: {
    'x-api-key': process.env.BSER_API_KEY,
  },
});
