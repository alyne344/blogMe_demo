/* global moment */
$(document).ready(function() {

    // newsfeed holds all forum posts =========================================
    const newsfeedContainer = $(".newsfeed");

    // category search (class=menu)?=============================================
    const categoryMenu = $(".menu");

    // Click events for the search category buttons
    // $(document).on("click", "button.search", handleCategorySearch);

    // posts variable
    const posts = "";

    // on click function for redirecting from newpost.html to home.html after hit "OK" ==========
    $("#newPostButton").click(function(e){
      e.preventDefault();
      window.location.href="home.html";
  });

    // This function grabs posts from the database and updates the view
    // ***** ?????home.html: Need to add value=" " for categories ?????*************
    function getPosts(category) {
      const categoryString = category;
      if (categoryString) {
        categoryString = "/category/" + categoryString;
      }
      $.get("/api/new-post/category/:category" + categoryString, function(data) {
        console.log("Posts", data);
        posts = data;
        if (!posts || !posts.length) {
          displayEmpty();
        }
        else {
          initializeFeed();
        }
      });
    }

// AJAX db with a GET request to a route set up
    $("#category.value").on("click", function(){
        url: "/api/home/",
        method: "GET"
    }).done(function(res){
      console.log(res);
      $("#postcardFeed").html('');
      let dataToInsert = ' ';
      for(let j=0; j=res.length; j++){

        dataToInsert += res.post;

      }
    });


    // // Getting the initial list of posts
    getPosts();

    // // NEEDS CARD INFO
    // // InitializeRows handles appending all of our constructed post HTML inside newsfeedContainer Div
    function initializeFeed() {
      newsfeedContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < posts.length; i++) {
        postsToAdd.push(createNewPostcard(posts[i]));
      }
      newsfeedContainer.append(postsToAdd);
    }

    // // This function constructs a post's HTML
    function createNewPostcard(post) {
      var newPost = $("<div>");
      newPost.addClass("news-postcard-top cell grid-x");

      var newPostProfileImage = $("<div>");
      newPostProfileImage.addClass("profile-stamp");
      newPostProfileImage.prepend($('<img>',{id:'theImg',src:'assets/img/stamp2.png'}));

      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newPostDate = $("<small>");
      newPostDate.addClass(news-story-date);
      newPostDate.text(formattedDate);

      var newPostHeading = $("<div>");
      newPostHeading.addClass("news-postcard-title expand");
      newPostTitle.text(post.title + " ");
      newPostHeading.append(newPostTitle);


      var newPostTitle = $("<h2>");
      newPostTitle.addClass("news-postcard-credentials grid-y");
      newPostTitle.append(newPostDate);

      var newPostBody = $("<div>");
      newPostBody.addClass("news-postcard-blurb expand");
      newPostBody.text(post.body);

      var newPostBodyBlurb = $("<p>");
      newPostBodyBlurb.appendTo($("news-postcard-blurb expand"));

      newPost.append(newPost);
      newPost.append(newPostHeading);
      newPost.append(newPostBody);
      newPost.data("post", post);

      // category ==== new category created on newpost form and pushed to dropdown????
      // var newPostCategory = $("<ul>");
      // newPostCategory.addClass("dropdown menu")
      // newPostCategory.text(post.category);
      // newPostCategory.css({
      //   <ul class="dropdown menu" data-dropdown-menu>
      //   <li><a value=" ">Cat 1</a></li>
      //   <li><a value=" ">Cat 2</a></li>
      //   <li><a value=" ">Cat 3</a></li>
      //   <li><a value=" ">Cat 4</a></li>
      // </ul>
      // });
      // newPostHeading.append(newPostCategory);

      return newPost;
    }

// Search category
  // function handleCategorySearch(){

  // }

    // This function displays a messgae when there are no posts
    function displayEmpty() {
      newsfeedContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({ "text-align": "center", "margin-top": "50px" });
      messageh2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
      newsfeedContainer.append(messageh2);
    }

    // This function handles reloading new posts when the category changes
    // function handleCategoryChange() {
    //   var newPostCategory = $(this).val();
    //   getPosts(newPostCategory);
    // }

  });
