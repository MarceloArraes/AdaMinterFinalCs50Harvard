      
    function displayImg4 (e){
          let reader = new FileReader() 
          const file = document.getElementById('file');
          reader.readAsDataURL(file.files[0])
          
          reader.onload = () => {
          console.log("reader.onload");
          setImage(reader.result)
          }
          postImage();
        }
        async function postImage () { 
          console.log("image setted: " + image);
          const ipfsViewResponse = await fetch("ipfsRegister",
          {method: "POST",  
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
        })
        .then(res => res.json())
        .then(data => {
          console.log("postImage");
          console.log(data);
          setMetadata({
            ...metadata,
            fileWebLink: data.fileWebLink,
            })
            return data;      
          })
          console.log(ipfsViewResponse);
}

function displayImg3() {
  let file = document.getElementById("file").files[0];
  let reader = new FileReader() 
        
  reader.onload = async function (e) {
    e.preventDefault();

    const data = new FormData();
    data.append('image', file[0]);
    console.log(data);
    document.querySelector("#output").src = e.target.result;
    
    await ipfsRegister(data);

    document.getElementById("submit_img").style.display = "none";
    document.getElementById("file").style.display = "none";
    document.querySelector(".metadata-container").style.display = "block"
  }
  reader.readAsDataURL(file);
}
