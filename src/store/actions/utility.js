export const convertFirestoreData = doc => {
    const { fields, name } = doc;
    let data = {
        id: name.split("/").pop()
    };

    for (let key in fields) {
        switch (key) {
            case "totalPrice":
                data[key] = parseFloat(fields[key].integerValue);
                break;
            case "ingredients":
                let ingredients = fields[key].mapValue.fields;
                ingredients["bacon"] = parseInt(
                    ingredients["bacon"].integerValue
                );
                ingredients["meat"] = parseInt(
                    ingredients["meat"].integerValue
                );
                ingredients["cheese"] = parseInt(
                    ingredients["cheese"].integerValue
                );
                ingredients["salad"] = parseInt(
                    ingredients["salad"].integerValue
                );
                data[key] = ingredients;
                break;
            default:
                break;
        }
    }
    return data;
};
