
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' }
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const student = {
        id: Date.now(),
        name: req.body.name
    };

    students.push(student);
    res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).send('Student not found');
    }

    student.name = req.body.name;
    res.json(student);
});

app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).send('Student not found');
    }

    students.splice(index, 1);
    res.send('Student deleted successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
