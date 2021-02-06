module.exports = (res, statusCode, data, setLength = false, extra = null) => {
    let responseObj = {};
    responseObj.status = 'success';
    if (setLength) responseObj.results = data.length
    if (data) responseObj.data = data;
    if(extra){
        if (extra.valid) responseObj.valid = extra.valid;
        if (extra.message) responseObj.message = extra.message;
        if (extra.expires) responseObj.expires = extra.expires;
    }

    res.status(statusCode).json(responseObj);
}