// backend/utils/responseUtil.js
const responseUtil = (data, message = 'Request successful', status = 'success') => {
    return {
        status,
        message,
        data,
    };
};

export { responseUtil };
