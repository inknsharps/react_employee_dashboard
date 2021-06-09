const handleFilter = (array, filter) => {
    return array.filter(user => {
        const [ { first, last }, email, { date }, phone ] = Object.values(user);
        const valuesString = `${first} ${last} ${email} ${new Date(date).toLocaleDateString()} ${phone}`;
        return valuesString.indexOf(filter) !== -1;
    })
}

export default handleFilter;