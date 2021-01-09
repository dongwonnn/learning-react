import React, { useCallback, useState } from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

// api key 받아오기 : 'https://newsapi.org/register'에서 가입
const App = () => {
  
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
// const [category, setCategory] = useState('all');
// const onSelect = useCallback((category) => setCategory(category), []);

// <div>
//   <Categories category={category} onSelect={onSelect} />
//   <NewsList category={category} />
// </div>

// const [data, setData] = useState(null);
// //const onClick = () => {
// // axios
// //   .get('https://jsonplaceholder.typicode.com/todos/1')
// //   .then((response) => {
// //     setData(response.data);
// //   });

// const onClick = async () => {
//   try {
//     const response = await axios.get(
//       'http://newsapi.org/v2/top-headlines?country=kr&apiKey=74e7b5b66333419989303e6f693d732e',
//     );
//     setData(response.data);
//   } catch (e) {
//     console.log(e);
//   }
// };

// return (
//   <div>
//     <div>
//       <button onClick={onClick}>불러오기</button>
//     </div>
//     {data && (
//       <textarea
//         rows={30}
//         value={JSON.stringify(data, null, 2)}
//         readOnly={true}
//       />
//     )}
//   </div>
// );
