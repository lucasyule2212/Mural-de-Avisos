module.exports={
    posts:[ ],

    getAllPosts() {
        return this.posts;
    },

    newPost(title,description,date,urgency){
        this.posts.push({id: generateID(),title,description,date,urgency});
    },
    deletePost(id){
     let filter =  this.posts.filter((obj)=>{
         return obj.id !=id;
     });

     this.posts=filter;
    }
}
function generateID() {
    return Math.random().toString(36).substr(2,9);
}

function idChecker(value,id) {
    return value.id!=id;
}