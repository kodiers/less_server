module.exports = {
    checkStringNotEmpty: function (str) {
        if (str === undefined || str === null || str.length === 0) {
            return false;
        }
        return true;
    }
};
