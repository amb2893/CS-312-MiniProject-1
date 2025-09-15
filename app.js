import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.post('/new-post', (req, res) => {
    const post = {
        id: posts.length + 1,
        name: req.body.name,
        title: req.body.title,
        body: req.body.body,
        time: new Date().toLocaleString(),
    };
    posts.push(post);
    res.redirect('/');
});




app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) 
    {
        res.render('edit', { post });
    } 
    else 
    {
        res.send('Post not found');
    }
});



app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex > -1) 
    {
        posts[postIndex].title = req.body.title;
        posts[postIndex].body = req.body.body;
        res.redirect('/');
    } 
    else 
    {
        res.send('Post not found');
    }
});

app.post('/delete/:id', (req, res) => 
{
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
});

app.listen(port, () => 
{
    console.log(`Server running at ${port}`);
});
