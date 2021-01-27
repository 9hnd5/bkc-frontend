import moment from 'moment';
export function validation(value, rules) {
    let result = ""
    for (let i = 0; i < rules.length; i++) {
        switch (rules[i]) {
            case NOT_EMPTY: {
                result = value ? "" : "This field is not allow empty";
                break;
            }
            case ONLY_NUMBER: {
                result = parseInt(value) ? "" : "This field required number";
                break;
            }
            default: {
                break;
            }
        }
        if (result) break;
    };
    return result;
}
export const NOT_EMPTY = "NOT_EMPTY";
export const ONLY_NUMBER = "ONLY_NUMBER"
export const NOT_IN_THE_PAST = "NOT_IN_THE_PAST";