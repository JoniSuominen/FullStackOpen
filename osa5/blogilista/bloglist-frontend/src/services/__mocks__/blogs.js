let token = null

const blogs = [
  {
    "_id": 1,
    "title": "Visual Studio Code on paras editori",
    "author": "Joni Suominen",
    "url": "http://tiko.blogs.tamk.fi/2018/11/27/tamkin-ja-muasin-yhteisprojekti-tyomotivaatiota-kehittamassa-pelillisyyden-avulla/",
    "likes": 23,
    "user": {
        "_id": "5c23cec922e87b05d8636927"
    }
},
{
  "_id": 2,
  "title": "Visual Studio Code on paras editori",
  "author": "Joni Suominen",
  "url": "http://tiko.blogs.tamk.fi/2018/11/27/tamkin-ja-muasin-yhteisprojekti-tyomotivaatiota-kehittamassa-pelillisyyden-avulla/",
  "likes": 8,
  "user": {
      "_id": "5c23cec922e87b05d8636927"
  }
},
{
  "_id": 3,
  "title": "Visual Studio Code on paras editori",
  "author": "Joni Suominen",
  "url": "http://tiko.blogs.tamk.fi/2018/11/27/tamkin-ja-muasin-yhteisprojekti-tyomotivaatiota-kehittamassa-pelillisyyden-avulla/",
  "likes": 6,
  "user": {
      "_id": "5c23cec922e87b05d8636927"
  }
}
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken;
}
export default { getAll, blogs, setToken }