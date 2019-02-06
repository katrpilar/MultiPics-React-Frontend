import getPictures from "../requests/getPhotos";

export function setQuery(text) {
    return {
        type: 'UPDATE_QUERY',
        query: text
      }
  }
  
  export function setPhotos(photos) {
    return {
        type: 'SET_PHOTOS',
        photos: photos
      }
  }


  //Rewritting get photos function
  function fetchPhotos(nextPage) {
    return (dispatch, getState) => {
      //Get pictureCount from the current state
      //Get the current query from current
      let pictureCount = getState().pics.length;
      let query = getState().query;
      let pics = getState().pics;
      //pictureCount, nextPage, query, allPictures
      return getPictures(pictureCount, nextPage, query, pics).then(
        photos => {
          photos == "Fetch Error" ? console.log("Action didn't dispatch") : dispatch(setPhotos(photos))
        }
      )
    };
  }

  // function makeASandwichWithSecretSauce(forPerson) {

  //   // Invert control!
  //   // Return a function that accepts `dispatch` so we can dispatch later.
  //   // Thunk middleware knows how to turn thunk async actions into actions.
  
  //   return function (dispatch) {
  //     return fetchSecretSauce().then(
  //       sauce => dispatch(makeASandwich(forPerson, sauce)),
  //       error => dispatch(apologize('The Sandwich Shop', forPerson, error))
  //     );
  //   };
  // }
  

// export const requestPhotos = (pictureCount, nextPage, query, allPictures) => ({
//   type: 'REQUEST_PHOTOS',
//   data: {
//       pictureCount: pictureCount,
//       nextPage: nextPage,
//       query: query,
//       allPictures: allPictures
//   }
// })

// import getPhotos from '../requests/getPhotos'

// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

// - SET_QUERY
// - SET_PHOTOS
// - DELETE_PHOTO
// - CLEAR_RESULTS = empties {page number, photos array, and search query}
// - SET_DOWNLOAD_FILTER = most recent, most popular
// - SET_DOWNLOADS

// export const selectSubreddit = subreddit => ({
//   type: SELECT_SUBREDDIT,
//   subreddit
// })

// export const invalidateSubreddit = subreddit => ({
//   type: INVALIDATE_SUBREDDIT,
//   subreddit
// })

// Synchronously add an employee.
// requestPhotos(pictureCount,nextPage, query, allPictures);

// export const receivePosts = (subreddit, json) => ({
//   type: RECEIVE_POSTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// })

// const fetchPhotos = data => dispatch => {
//   dispatch(requestPhotos(data.pictureCount, data.nextPage, data.query, data.allPictures))
//   return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//     .then(response => response.json())
//     .then(json => dispatch(receivePosts(subreddit, json)))
// }

// const shouldFetchPosts = (state, subreddit) => {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
//   if (shouldFetchPosts(getState(), subreddit)) {
//     return dispatch(fetchPosts(subreddit))
//   }
// }
