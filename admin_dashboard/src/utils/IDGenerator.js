import uniqid from "uniqid";

const IDGenerator = (prefix) => {
    return uniqid(prefix);
};

export const uniqid8byteGen = () => {
    return uniqid.time();
}

export default IDGenerator;