const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')


let page = 1


const getPosts = async () => {
const response = await 
fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&page=${page}`)
  return response.json() 
}

const addPostsIntoDOM = async () => {
  const posts = await getPosts()
  const postsTemplate = posts.map(({id, title, body}) =>  `
    <div class="post">
      <div class="number">${id}</div>
        <div class="post-info">
          <h2 class="post-title">${title}</h2>
          <p class="post-body">${body}</p>
        </div>
    </div>
    `
  ).join('')

  postsContainer.innerHTML += postsTemplate
}


const getNextPosts = () => {
  setTimeout(()=> {
    page++
    addPostsIntoDOM()
 }, 300)
  
} 
  const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show')
    getNextPosts()
  }, 1000)
}

const showLoader = () => {
loaderContainer.classList.add('show')
removeLoader()


}


const HandleScrolltoPage = () => {
const {clientHeight, scrollHeight, scrollTop} = document.documentElement
const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
if (isPageBottomAlmostReached) {
  showLoader()
}
}



const showPostIfMatchInputValue = inputValue => post => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const postContainerInputValue = postTitle.includes(inputValue) 
    || postBody.includes(inputValue)
      
    if(postContainerInputValue) {
        post.style.display = 'flex'
        return 
      }

      post.style.display = 'none'
  
  }

const handleEventInput = event => {
  const inputValue = event.target.value.toLowerCase()
  //Faz  seleção de todas divs que contem a class post
  const posts = document.querySelectorAll('.post')
  
  posts.forEach(showPostIfMatchInputValue(inputValue));
}
addPostsIntoDOM()
window.addEventListener('scroll', HandleScrolltoPage)
filterInput.addEventListener('input', handleEventInput)