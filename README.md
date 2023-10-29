# blog-api

#routes:
- Post on "/api/" (required body : { title, content, authorName, authorEmail })     // create blog
- GET on "/api/blogs/:blogId" (required body : none)                                // get specific blog
- GET on "/api/blogs/" (required body : none)                                       // get all blogs
- POST on "/api/blogs/:blogId" (required body : { text, userName })                 // create comment on a blog
- GET on "/api/blogs/:blogId/comments" (required body : none)                       // get all comments of a blog
- PUT on "/api/blogs/:blogId/likes" (required body : none)                          // increase likes of a blog
