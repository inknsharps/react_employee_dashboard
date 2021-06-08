const handleSort = (array, order) => {
    switch (order) {
        case true:
            array.sort((a, b) => {
                const nameA = a.name.first;
                const nameB = b.name.first;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            return array;
        case false:
            array.sort((a, b) => {
                const nameA = a.name.first;
                const nameB = b.name.first;
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
                return 0;
            })
            return array;
        default:
            throw new Error();
    }
};

export default handleSort;