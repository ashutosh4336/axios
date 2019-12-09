// Axios Globals
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
// function getTodos() {
//   axios({
//     method: 'get',
//     url: 'http://jsonplaceholder.typicode.com/todos',
//     params: {
//       _limit: 5
//     }
//   })
//     .then(res => showOutput(res))
//     .catch(err => console.error(err));
// }

function getTodos() {
  axios
    .get('http://jsonplaceholder.typicode.com/todos', {
      params: { _limit: 5 },
      timeout: 5
    })
    //can add the limit in url with http://jsonplaceholder.typicode.com/todos?_limit=5
    //can ommit get as axios make get request by default
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post('http://jsonplaceholder.typicode.com/todos', {
      title: 'New ToDo',
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT REQUEST
function updateTodo() {
  axios
    .put('http://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated ToDo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}
// PATCH Request
function patchTodo() {
  axios
    .patch('http://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated ToDo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete('http://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get('http://jsonplaceholder.typicode.com/todos'),
      axios.get('http://jsonplaceholder.typicode.com/posts')
    ])
    .then(
      axios.spread((todos, posts) => {
        showOutput(todos);
      })
    )
    .catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Contect-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  axios
    .post(
      'http://jsonplaceholder.typicode.com/posts',
      {
        title: 'New toddo',
        completed: true
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  //   console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'http://jsonplaceholder.typicode.com/posts',
    data: {
      title: 'hello axios'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  //   console.log('Error Handling');
  axios('http://jsonplaceholder.typicode.com/pojsts?_limit=2')
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        //Server Responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          console.error('Error: Page Not Found');
        }
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.log(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get('http://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request cancel', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled !!!');
  }
}

// AXIOS INSTANCES

const axiosInstance = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com'
});

// axiosInstance.get('/comments').then(res => showOutput(res));

// INTERCEPTING REQUESTS & RESPONSES
//AXIOS INTERCEPTER
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('updatepatch').addEventListener('click', patchTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
