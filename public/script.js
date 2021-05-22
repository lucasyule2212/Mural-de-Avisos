
document.addEventListener('DOMContentLoaded',()=>{ //garantindo que os posts só serao carregados na pagia quando todos os elementos tiverem sido carregados pelo navegador
    updatePosts();
})



function updatePosts() { //chamada no backend para pegar as informaçoes dos posts e passar como CARDS
    fetch("http://localhost:3000/api/all").then(res=>{ // o fetch gera uma promise com o JSON da chamada
       return res.json();
    }).then(json=>{  //tratamento do JSON gerado pelo fetch e lógica dos posts
        let postElements='';
        let posts = JSON.parse(json); //transformando o json stringfied em objeto
        posts.forEach(post => {  //pegando cada objeto post e criando o estilo do CARD 
            let postElement = ` 
        <div id="${post.id}" class=" border-${post.urgency} border-2 card w-100 rounded mb-2 shadow-sm h-auto bg-light">
            <div class="card-header d-flex justify-content-center">
              <h5 class="card-title">${post.title}</h5>
            </div>
            <div class="card-body">
              <div class="card-text">${post.description}</div>
            </div>
            <div class="card-footer d-flex justify-content-center ">
              <h6 class="text-muted">${post.date}</h6>
            </div>
        </div>`;
            postElements+=postElement; // concatenando todos os posts a serem carregados
        });
        document.getElementById("mural").innerHTML=postElements; // postando os posts no HTML
    })   
}

function newPost() {
    
}