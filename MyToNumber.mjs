import MyStringToNumber from "./MyStringToNumber.mjs";
import MyToPrimitive from "./MyToPrimitive.mjs";

export default function MyToNumber(inpValue) {
    switch (typeof inpValue) {
        case 'number': return inpValue;
        case 'bigint':
        case 'symbol': throw TypeError();
        case 'undefined': return NaN;
        case 'boolean': return inpValue ? 1 : 0;
        case 'string' : return MyStringToNumber(inpValue); 
        case 'object': if (inpValue === null) return 0;
    }
    
    return MyToNumber(MyToPrimitive(inpValue));
}