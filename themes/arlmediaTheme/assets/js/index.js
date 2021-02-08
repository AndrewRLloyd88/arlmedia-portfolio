import axios from 'axios';

axios.get('https://api.kanye.rest').then((res) => {
  console.log(res.data);
});
