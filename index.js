const express=require("express");

const app=express();

let port=8080;

const path=require("path");

const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");

const methodOverride = require('method-override');
 
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Listning to port :${port}`);
});



let posts=[{
    id:uuidv4(),
    name:"Sharan",
    content:"I like coding"
},
{
    id:uuidv4(),
    name:"Moksh",
    content:"I like memes"
},
{
    id:uuidv4(),
    name:"Nitesh",
    content:"I like bakchodi"
}
];



//Api to show all posts(READ)
app.get("/posts",(req,res)=>{
    res.render("index",{posts}); 
});


//Api to send get req to redirect page to create the post inside a form
app.get("/posts/new",(req,res)=>{
    res.render("newPost");
})


//This sends entered data to the main page
app.post("/posts",(req,res)=>{
    let {name,content}=req.body;
    let id=uuidv4(); 
    posts.push({id,name,content});
    res.redirect("/posts"); 
})



//Used to show or read individual post according to id
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if(!post){
        res.render("error");
    }
    else
    res.render("indivPost",{post});
})



//A get req whcih redirects to a form to edit changes and sends patch req to /posts/id
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit",{post});
})


//After the patch req is came here, we change post.content=newContent by targetting specific  post and redirect to /posts
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
})


//Delete req sent by the form in index.ejs filters the posts which id!=post(id) and hence doesnt take value the selected post, at last redirects to /posts
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})






