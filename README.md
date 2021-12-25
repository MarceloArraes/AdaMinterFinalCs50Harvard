# minter
## Distinctiveness and Complexity:  
This is a page that allows any user to create (mint) a nft with a picture of your own. It's nothing like the other projects on the course, even in the most fundamental way. Following the principle of Web3, I don't made mandatory for the user to register or log in. For the full use of the website, you just need to have a Cardano wallet, the funds to send, and the receiving address of that wallet to receive the NFT. At first glance, the may seem quite simple when the only interaction you have to do is upload an image, write some input texts, such as title, author, and description, then send the correct funds to the wallet, and click to mint the nft. But in the background, there are a lot of things being done.  
First of all, I used a descentralized server called IPFS to register the image and offer the link to be saved in the metadata that will be saved later on the Cardano blockchain. To register on IPFS first, when I was just locally programing, I uploaded the image to the backend and then saved it locally, then sent the URL to the IPFS to be registered.  When I went to production, I found out that "default_storage" could not be used in production, so I learned how to update to AWS, then I downloaded from AWS and saved locally to register on IPFS. I'm sure this was not the most efficient way. But I'm following the philosophy of "better done than perfect." (melhor feito que perfeito - in Portuguese, where it sounds better).  
Then, when the user confirms the metadata, I send it as a transaction to the Cardano Node running on my server. The installation and configuration of the Cardano Node deserves some mention as it took me a long time to understand some fundamentals. The material explaining this to noobs like me is quite scarce, so making this Cardano Node run right on the Cardano Testnet took me some good days of trial and error. If the Docker on my computer were working, it would have made it easier, but it was not. Taking back. When the user sends the metadata, I use it to fill in the transaction info and send it to the Cardano Node for it to give me the Fee that I have to pay to make this register. All this using a great tool called cardanocli-js that abstract the cli commands into js.  
With the Fee in hand, I show it to the user, along with the wallet address where the user is supposed to send the funds. From this point forward, I added a timer to react with useEffect to see if the fund was met with payment. I've done this on the front end, but in retrospect, I probably should've let the backend deal with it. And maybe here lays a security risk for me to deal with at some point.  
When the funds are met with payment, I show the user, using Javascript, the field where he can put his own receiving Address. That been done, and the submit button pressed. We return to nodejs in order to mint and send the NFT on the Cardano Node.And we present the confirmation on chain link— A website called Cardano Scan or Cardano Explorer—that shows the transaction with a little delay. Sometimes the NFT shows up in the user's wallet before the confirmation link shows that the transaction has been done. Something has to be done about this waiting time where the user may think that the transaction did not work.  
Looking back in retrospect, I have made a lot of suboptimal choices, and that even shows clearly in the way the code is dispersed inside the repository. But I'm pretty proud of how far I've come from not remembering anything about programming at the beginning of this course, and now that I've learned a lot with your great classes, and even better, i learned with you how to learn for myself and to persevere even tho sometimes it seems like I was facing insoluble problems.  
I've learned how to set up a virtual server. I did it with Ubuntu Server on my Virtual Machine in the Virtual Box. I learned how to set up Django for production. I bought a domain and made my website responsive and safe with an SSL certificate installed. Every part of this journey was met with problem solving and perseverance.  
I'm really grateful to you all for guiding me so well and for free(!!).  
### What’s contained in each file you created?
# within the nftminter app: Using an
art generator, I created this first as I was exploring the field.
layout.html = I take it from former Havard projects to make a register/login experience that will be used in the next steps of the project.  
upload.html = concentrate all my work as I didn't learn how to compartimentalize the React functions as we are using this babel squeme to code.
# nodejs inside myapp:
Here are files that deal with the requisition of the Cardano blockchain, like:  
cardano.js, create-wallet.js, fee-cost.js, get-balance.js, mint-asset.js.
The names coincide with their functions.
# Formalized paraphraseHow to run your application
First run a Cardano Node locally on a Linux machine, then
let the Node sync with the blockchain. (takes a little time, like 2 hours)
Clone the repository into a git folder on your personal computer.
Install the requirements (best done using a virtual environment).
As my main repository is set for production, you should edit the setting to change it back to local development. (debug=true, erase every variable with'secure' on the name and allow _hosts = "127.0.0.1")
# issues that I know need to be fixed or improved.
paths are not fully abstract, some I put literally, and that's wrong.
Some security issues with processing being done on the front.  
My secret keys (AWS keys, IPFS keys, Cardano Wallet secret keys) are mostly vulnerable.
I will put loading cues after the submit buttons.  
The site needs better treatment of errors. For both users and developers.  
I need to write a little tutorial on how to use the website for the general public.
I have to make multiple wallets-a wallet for every transaction-to make sure that different payments don't interfere with each other. We didn't do that from the get-go because the testing process would create a lot of unwanted wallets.
# Disclosure of code origins:  
I used many sources for my code. Gimbalabs helped me to understand Cardano-cli commands and I used their Unsig guides to create my adaptation. John Ward on YouTube taught me how to upload my images to IPFS. The Cardanocli-js repository on github gave me the tool and some examples of how to manipulate the blockchain. I took GetCookie (a way to work with CSRF tokens) from Stockoverflow. And many more inspirations and codes helped build my own.
# Future.
I will make a marketplace for the NFT's made here. And then I will create a way for someone to buy a board with information about their picture on the blockchain. Like a physical registry. And many more ideas to come. Some of theirs will use the Login feature that is currently unused.  