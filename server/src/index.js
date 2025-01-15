import express from "express"
import cors from "cors"
import {StreamChat} from "stream-chat"
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";

 const app = express()

 app.use(cors());
 app.use(express.json());
 const api_key = "8qhycckxhwfj"
 const api_secret = "d23kt4v86qnuurt9qupt3e4h4yjb49nyepskzfs9z6u8fu48sxy6zacytcwhr6vn";
 const serverClient = StreamChat.getInstance(api_key,api_secret);

 app.post("/signup", async(req, res) => {
   try {
     const {firstName, lastName, username, password} = req.body
     const userId = uuidv4();
     const hashedPassword = await bcrypt.hash(password, 10);
     const token = serverClient.createToken(userId);
     res.json({token, userId, firstName, lastName, username, hashedPassword})
   } catch (error) {
      res.json(error);
   }
});
 app.listen(3001, () => {
    console.log("Server is running on port 3001");
 })