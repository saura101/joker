import express from "express";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/", async(req,res)=> {
    try {
        const response= await axios.get("https://v2.jokeapi.dev/joke/Any?type=twopart");
        console.log(response.data);
        const joke= {
            build:response.data.setup,
            punch:response.data.delivery
        }
        console.log(response.data.setup);
        console.log(joke.punch);
        res.render("index.ejs",{
            joke:joke
        });
    } catch (error) {
        console.log(error.message);
        res.render("index.ejs",{error:error.message});
    }
});

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});