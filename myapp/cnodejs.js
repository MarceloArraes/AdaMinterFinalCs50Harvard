const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  //return JsonResponse({"message": "Like retrieved successfully."}, status=201)
  res.status(201).json({message: "Like retrieved successfully."})
  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})