# Chapter 14 : 외부 API를 연동하여 뉴스 뷰어 만들기

# 🎯 비동기 작업의 이해

## 1. 비동기처리

- 시간이 걸리는 작업( 서버 쪽 데이터가 필요할 때 )은 Ajax 기법을 사용하여 서버의 API를 호출함으로써 데이터 수신
- 서버의 API를 사용해야 할 때는 네트워크 송수신 과정에서 시간이 걸리기 때문에 작업이 즉시 처리되지 않고 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리한다.
- 이 작업을 비동기적으로 처리
- 비동기적 처리
  - 요청을 처리하더라도 웹 애플리케이션이 멈추지 않고 동시에 여러 가지 요청을 처리 가능
  - 기다리는 과정에서 여러 함수도 호출 가능
  - 서버 요청외에 특정 작업을 예약할 때
- 동기적 처리
  - 한 요청이 끝날 때까지 기다리는 동안 중지 상태가 되어 다른 작업을 할 수 없다.
  - 이 요청이 끝나야 다음 작업을 할 수 있음.

## 2. 콜백함수

- 비동기 작업을 할 때 흔히 사용하는 방법
- 함수의 인자에 함수를 넣는 방법으로 순서 지정 가능

```
function increase(number, callback){
    setTimeout(() => {
        const result = number + 10;
        if(callback){
            callback(result);
        }
    }, 1000)
}

increase(0, result => {
    console.log(result)
    increase(result, result => {
        console.log(result)
        increase(result, result => {
            ...
        })
    })
})
```

- 단점 : 코드가 여러 번 중첩되어 콜백 지옥에 빠진다.

## 3. Promise

- 콜백 지옥에 빠지지 않게 하기 위한 방법

```
function increase(number){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = number + 10;
            if(result > 50){
                const e = new Error('에러 메세지')
                return reject(e)'
            }
            resolve(result);
        }, 1000)
    });
    retrun promise;
}

increase(0)
.then(number => {
    console.log(number);
    return increase(number)
})
.then(number => {
    console.log(number);
    return increase(number)
})
.then(number => {
    console.log(number)
    return incrase(number)
})
.catch(e => {
    console.log(e)
})
```

- 콜백함수를 감싸지 않고 then을 이용하여 다음 작업을 설정한다.

## 4. async/await

- Promise를 더욱 쉽게 사용할 수 있도록 해주는 문법
- 함수의 앞부분에 async, 해당 함수 내부에서 Promise의 앞부분에 await 키워드 사용
- Promise가 끝날 때까지 기다리고, 결과 값을 특정 변수에 담을 수 있다.

```
function increase(number){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = number + 10;
            if(result > 50){
                const e = new Error('에러 메세지')
                return reject(e)'
            }
            resolve(result);
        }, 1000)
    });
    retrun promise;
}

async function runTasks() {
    try{
        let result = await incrase(0);
        console.log(result)
        result = await increase(result);
        console.log(result)
        result = await increase(result);
        console.log(result)
    }catch(e){
        console.log(e)
    }
}
```

- 예외 처리를 try, catch를 이용해서 처리

- axios와 같이 Promise 기반으로 처리되는 것이 있다면 그냥 async, await를 사용하면 됨.

# 🎯 axios로 API 호출해서 데이터 받아 오기

### 1. axios

- 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트.
- HTTP 요청을 Promise 기반으로 처리한다 -> 바로 async, await 사용 가능
- 설치
  > yarn add axios
- 사용

  ```
  const [data, setData] = useState(null);
  const onClick= () => {
      axios.get('https://jsonplaceholder.typicode.com/todos/1').then(resoponse=>{
          setData(response.data);
      })
  }
  ```

  - axios.get 함수 : 파라미터로 전달된 주소에 GET요청.
  - .then을 이용하여 결과값 response.data를 setData를 통해 설정.

- async, await 사용

```
const [data, setData] = useState(null);
const onClick = async () => {
    try{
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos/1',
        );
        setData(response.data);
    }catch(e){
        console.log(e)
    }
}
```

# 🎯 newsapi API 키 발급받기

- newsapi에서 제공하는 API를 사용하기 위해 키 발급

  - https://newsapi.org/register
  - 발급받은 API 키는 API를 요청할 때 쿼리 파라미터로 넣어서 사용하면 된다.
  - 사용할 API : https://newspai.org/s/south-korea-news-api
  - 전체 뉴스(all)과 특정 카테고리 뉴스 2가지 사용

- 클릭하면 row 데이터 생성하는 코드

```
  const onClick = async () => {
    try {
      const response = await axios.get(
        `http://newsapi.org/v2/top-headlines?country=kr&apiKey=74e7b5b66333419989303e6f693d732e`,
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
```

# 🎯 뉴스 뷰어 UI 만들기

- yarn add styled-components

## 1.NewsItem 만들기

- api를 통해 가져온 데이터 article 객체는 안에 titie, description, url, urlToImage 가지고 있음.

## 2. NewsList 만들기

- NewsItem에 넘겨줄 props 설정 (title, description, url, urlToImage)

  ```
  const sampleArticle = {
  title: '제목',
  description: '내용',
  url: 'https://google.com',
  urlToImage: 'https://via.placeholder.com/160',
  };

  const NewsList = () => {
  return (
      <div>
      <NewsItem article={sampleArticle} />
      </div>
  )
  ```

# 🎯 데이터 연동하기

- 화면에 처음 보이는 시점에 API 요청-> [useEffect](<https://github.com/dongwonnn/learning-react/blob/main/summaries/Chapter%2008%20(2).md>) 사용
- useEffet는 뒷정리 함수를 반환하기 때문에 async를 붙여선 안된다.
- 따라서 쓰고 싶다면 함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용해야 한다.

  ```
  useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      try {
          const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr&apiKey=74e7b5b66333419989303e6f693d732e`,
          );
          setArticles(response.data.articles);
      } catch (e) {
          console.log(e);
      }
      setLoading(false);
      };
      fetchData();
  }, []);

  if (loading) {
      return <div>대기 중...</div>;
  }

  if (!articles) {
      return null;
  }
  ```

  - map 함수를 사용하기전 articles가 있는지 확인해야한다. 없다면 흰 화면만 나오게 된다.

# 🎯 카테고리 기능 구현하기

## 1. 카테고리 선택 UI 만들기

- business, entertainment, health, science, sports, technology 6가지 카테고리
- categories.js 설정.

  ```
  const categories = [
      {
          name: all,
          text: '전체보기'
      }
      ...
  ]

  return (
      <CategoriesBlock>
        {categories.map(c => (
            <Category
             key={c.name}
             active={category === c.name}
             onClick={()=> onSelect(c.name)}
            >{c.text}</Category>
        ))}
      </CategoriesBlock>
  )
  ```

- App.js

```
const [category, setCategory] = useState('all')
const onSelect = useCallback(category => setCategory(category), []);

return(
    <>
        <Categories category={category} onSelect={onSelect}>
    <>
)
```

## 2. 카테고리 지정하기

- NewsList.js

  ```
  const NewsList = ( {category} ) => {

  useEffect(() => {
  const fetchData = async () => {
  setLoading(true);
      try {
          const query = category === 'all' ? '' : `&category=${category}`
          const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=74e7b5b66333419989303e6f693d732e`,
      );
          setArticles(response.data.articles);
      } catch (e) {
          console.log(e);
      }
  setLoading(false);
  };
  fetchData();
  }, [category]);
  }
  ```

  - query 변수를 통해 카테고리 별 API 호출
  - useEffect의 두 번째 파라미터에 category 설정

# 🎯 리액트 라우터 적용하기

- yarn add react-router-dom, index.js에서 컴포넌트 설정

## 1. NewsPage 설정

- 단 하나의 페이지 사용
- pages/NewsPage.js

  ```
  const NewsPage = ( {match} ) => {
      const category = match.params.category || 'all';

      return (
          <Category />
          <NewsList category={category}>
      )
  }
  ```

- App.js

  ```
  const App = () => {
      return <Route path="/:category?" component={NewsPage}>
  }
  ```

  - /:category? 의 ?는 있을 수도 있고 없을 수도 있다는 뜻. 없다면 all.

## 2. NavLink 사용하기

- 선택된 카테고리에 다른 스타일을 주는 기능

```
<CategoriesBlock
    key = {c.name}
    activeClassName="active"
    exact={c.name==='all'}
    to={c.name === 'all' ? '/' : `/${c.name}`}
/>
```

# 🎯 usePromise 커스텀 Hook 만들기

- API 호출처럼 Promise를 사용해야 하는 경우 간결하게 코드를 작성 할 수 있도록 해 주는 커스텀 Hook
- src/lib/usePromise.js
