import { v4 } from "uuid";

function getNewUUID() {
    return v4();
}

export default getNewUUID;