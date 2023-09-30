const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


const users = [
    {id: 1, name: "Daniel", age:40},
    {id: 2, name: "Gabriel", age:30},
    {id: 3, name: "Magno", age:20},
    {id: 4, name: "Wagner", age:10}
];

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name, 
        age: req.body.age
    };

    users.push(newUser);
    res.json(newUser);
    // res.send('Got a POST request')
})

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if(user){
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found,');
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.findIndex(u => u.id === userId);

    if(user !== -1){
        users.splice(user, 1);
        res.status(200).send('User deleted sucessfully.');
    } else {
        res.status(404).send('User not found,');
    }

})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})