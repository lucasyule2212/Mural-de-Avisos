
document.addEventListener('DOMContentLoaded',()=>{ //garantindo que os posts só serao carregados na pagia quando todos os elementos tiverem sido carregados pelo navegador
    updatePosts();
})



function updatePosts() { //chamada no backend para pegar as informaçoes dos posts e passar como CARDS
    fetch("http://192.168.0.206:3000/api/all").then(res=>{ // o fetch gera uma promise com o JSON da chamada
       return res.json();
    }).then(json=>{  //tratamento do JSON gerado pelo fetch e lógica dos posts
        let postElements='';
        let posts = JSON.parse(json); //transformando o json stringfied em objeto
        posts.forEach(post => {  //pegando cada objeto post e criando o estilo do CARD 
            let postElement = ` 
        <div id="${post.id}" class=" border-${post.urgency} border-2 card w-100 rounded mb-2 shadow-sm h-auto bg-light">
            <div class="card-header d-flex justify-content-center">
              <h5 class="card-title">${post.title}</h5>
               <a href="#" onclick="deletePost(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" id="deletePostBtn" fill="currentColor" class="bi bi-x position-absolute top-0 end-0" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
               </svg>
              </a>
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

function newPost() { //recebendo os dados de um novo CARD 
    let title= document.getElementById("title").value;
    let description= document.getElementById("desc").value;
    let data = new Date(document.getElementById("date").value);
    let dateFormat= ((data.getDate() +1 )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); //formatando a DATA
    let urgency = checkUrgency();

    let post = { //criando objeto post
      title:title,
      description:description,
      date:dateFormat,
      urgency,urgency
    }
    const options={method:"POST", //configuraçao do método POST, que enviará os dados do post como JSON
    headers: new Headers({"content-type":"application/json"}),
    body:JSON.stringify(post)};

    fetch("http://192.168.0.206:3000/api/new",options).then(res=>{ //chamada no backend para criar um novo post 
      console.log(res);
      updatePosts();
      document.getElementById("title").value=""; //resetando os campos do formulário
      document.getElementById("desc").value="";
      document.getElementById("date").value="";

    })

    
}

function checkUrgency() { //funçao que checa qual a urgency escolhida
  let urgencyValue="";
    document.querySelectorAll("input.form-check-input").forEach(urgencies=>{
      if (urgencies.checked==true) {
        urgencyValue=urgencies.value;
      }
    });
  return urgencyValue  
}


function deletePost(event) {
 let postId = event.parentElement.parentElement.id;
 
 let post ={
   id:postId
 }
 
 const optionsDEL={method:"DELETE", //configuraçao do método DELETE, que enviará os dados do post como JSON
 headers: new Headers({"content-type":"application/json"}),
 body:JSON.stringify(post)};

 fetch("http://192.168.0.206:3000/api/del",optionsDEL ).then(res=>{
   console.log(res);
   updatePosts();
 })
}