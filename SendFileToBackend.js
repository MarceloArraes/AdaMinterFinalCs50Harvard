      
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


const ipfsRegister = (blob) => {

  console.log(blob);
    fetch('ipfsRegister',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blob)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMetadata({
            ...metadata,
            fileWebLink: data.url,
    });
        })
        .catch(err => console.log(err));
  }

  async function displayMetadata() {
    document.querySelector(".payment-container").style.display = "block";
    if (metadata.nsfw) {
      document.querySelector("#NSFW-checkbox").innerHTML = "NSFW IMAGE";
    } else {
      document.querySelector("#NSFW-checkbox").innerHTML = "";
    }
    var balance = await balanceCheck()
    let metaAndFee= await fetchFees()

    console.log("DISPLAY METADATA BALANCE LOG");
    console.log(balance.balance);

    setReceiverBalance(balance.balance)
    setFees(metaAndFee.fee)

    console.log("FEE: ");
    console.log(metaAndFee.fee);

    document.querySelector('.fee').innerHTML = metaAndFee.fee;
    document.querySelector('.content').innerHTML = metaAndFee.wallet.senderadress;
  }

  function displayImg(){
    const file = document.getElementById('file').files[0];
    
    let link = document.querySelector('#link');

    const reader = new FileReader();

    reader.readAsDataURL(file);
    
      reader.onload = async function (e) {
        e.preventDefault();
        
        //this is the way i encode the file image into a blob
        let blob = new Blob([file], {type: 'image/jpeg'});
        link.href = URL.createObjectURL(blob);
        //link.click();
        //This way i send a html-img
        var img = document.getElementById('output');
        img.src = e.target.result;
        //send to server as a formData - not working
        //var formData = new FormData();
        //formData.append("blob", blob);
        //try to send formData to server
        //ipfsRegister(formData);

        //Try to send pure Blob to server
        //ipfsRegister(blob);

        //This way i send a dataURLS.
        //ipfsRegister(reader.result);

        const encodedUrl = encodeURI(reader.result);
        ipfsRegister(encodedUrl);
    }
  }
