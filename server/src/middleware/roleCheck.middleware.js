const roleCheck = (role) => {
    return (req, _, next) => {
        if (req.user.role !== role) {
            throw new apiError(403, "Forbidden");
        }
        next();
    };
};

export default roleCheck;
