import fs from 'fs';


// streaming home via public acces 
export const initHome = (req, res, next) => {
    const homeStream = fs.createReadStream('./public/home.html');

    let data = ''
    homeStream.on('data', ch => {
        data += ch.toString();
    });

    homeStream.on('end', () => {
        req.home = data;
        return next();
    });
    homeStream.on('error', (err) => next(err));
}


// handling home erorr when trying to fetch stream
export const homeError = (err, req, res, next) => {
    console.error("Home error :: ", err);
    const statusCode = res.statusCode || 500
    res.status(500).json({
        status: statusCode,
        message: err?.message || 'unable to go home'
    });
}

