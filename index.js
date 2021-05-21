//document.addEventListener(`DOMContentLoaded`, async function(event) {
firebase.auth().onAuthStateChanged(async function(user) {

  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    console.log(`logged in`)
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })
  // Build the URL for our posts API
  let url = `/.netlify/functions/posts`

  // Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)

  // Ask for the json-formatted data from the response, wait for the data, store it in memory
  let json = await response.json()

  // Write the json-formatted data to the console in Chrome
  console.log(json)

  // Grab a reference to the element with class name "posts" in memory
  let postsDiv = document.querySelector(`.posts`)

  // Loop through the JSON data, for each Object representing a post:
  for (let i = 0 ; i<json.length ; i++) {
    // Store each object ("post") in memory
    let post = json[i]
    console.log(post)
    // Create some markup using the post data, insert into the "posts" element
    postsDiv.insertAdjacentHTML(`beforeend`, `
    // e.g.
    // <div class="md:mt-16 mt-8">
    //   <div class="md:mx-0 mx-4 mt-8">
    //     <span class="font-bold text-xl">${post.userName}</span>
    //   </div>
    //   <div class="my-8">
    //     <img src="${post.imageUrl}" class="w-full">
    //   </div>
    //   <!-- comments -->`)
      for (let j = 0; j <post.comments.length; j++){
        let comment = post.comments[j]
        postsDiv.insertAdjacentHTML(`beforeend`, `
        <div><strong>${comment.userName}</strong>${comment.body}</div>
        `)
      }
      
    
    // Practice... how would you do the comments?
  }

  } else {
      // user is not logged-in, so show login
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: `index.html` // where to go after we're done signing up/in
    }

    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)
  }
})
  // // create an empty string
  //   let commentsMarkup = ``
  //   // loop through comments 
  //   let comments = post.comments
  //   for let (commentsIndex = 0 ; commentsIndex < comments.length, commentsIndex++) {
  //     // store comments in memory
  //     let commentNew = comments[commentsIndex]
  //     commentsMarkup = commentsMarkup + `<div><strong>${commentNew.userName}</strong></div>`

  //   }