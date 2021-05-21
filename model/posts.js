module.exports={
    posts:[
        {   id:0,
            title:"Teste",
            description:"Teste de post",
            date:"20/05/2021",
            urgency:"green"
        },
    ],

    getAllPosts() {
        return this.posts;
    },

    newPost(title,description,date,urgency){
        this.posts.push({id: generateID(),title,description,date,urgency});
    },
    deletePost(index){
        this.posts.splice(index-1,1);
    }
}
function generateID() {
    return Math.random().toString(36).substr(2,9);
}