
function dynamic(app) {
    app.get('/users/:id', (req, res) => {
        const userId = req.param.id; // acces the variable from url
        res.send("Viewing profile for user ID" + userId);
    })
}