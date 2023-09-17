import cors from "cors";
import express from "express";
import { convert } from "./convert.mjs";
import { downloadVideo } from "./download.mjs";
import { transcribe } from "./transcribe.mjs";
import { summarize } from "./summarize.mjs"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id",  async (request, response) => {
  try {
     await downloadVideo(request.params.id)
     const audioConverted = await convert()
     console.log(audioConverted)
    const result = await transcribe(audioConverted)

  return  response.json({ result })
  } catch(error){
    console.log(error)
    return response.json({error})
  }
})

app.post("/summary", async (request, response) => {
  try{
   const result =  await summarize(request.body.text)
   return response.json({result})
  } catch(error){
    console.log(error)
    return response.json({error})
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))
