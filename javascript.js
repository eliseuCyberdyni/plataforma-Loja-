const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Rota para criar um novo post
app.post('/posts', (req, res) => {
    const post = req.body;
    // Aqui você salvaria o post no banco de dados
    res.status(201).send(post);
});

// Rota para listar posts
app.get('/posts', (req, res) => {
    // Aqui você buscaria os posts do banco de dados
    res.send([/* lista de posts */]);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rede_social', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PostSchema = new mongoose.Schema({
    content: String,
    author: String,
    created_at: Date
});

const Post = mongoose.model('Post', PostSchema);

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifique as credenciais no banco de dados (não mostrado aqui)
    const token = jwt.sign({ username }, 'segredo_jwt', { expiresIn: '1h' });
    res.json({ token });
});

import React, { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.author}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Posts;

