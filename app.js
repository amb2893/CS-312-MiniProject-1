import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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

app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});
