import MyToNumber from "./MyToNumber.mjs";

export default function MyToPrimitive(inpObject, preferredType = 'STRING') {
    return preferredType === 'NUMBER' ? MyToNumber(inpObject) : inpObject.toString();
}