


export const getStatusColor = (status: string) => {
    let className: string;
    switch (status.toLowerCase()) {
        case "completed":
            className = "bg-green-100 text-green-800";
            return className;
        case "in-progress":
            className = "bg-blue-100 text-blue-800";
            return className;
        case "pending":
            className = "bg-yellow-100 text-yellow-800";
            return className;
        default:

            className = "bg-gray-100 text-gray-800";
            return className;
    }
};
