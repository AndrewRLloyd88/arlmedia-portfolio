import axios from 'axios';
import lunr from 'lunr';

axios.get('https://api.kanye.rest').then((res) => {
  console.log(res.data);
});
