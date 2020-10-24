module.exports = function check(str, bracketsConfig) {
    Array.prototype.peek = function () {
        if (this.length > 0) {
            return this[this.length - 1];
        }
        return undefined;
    }
    const stack = [];
    const bracketMap = {};
    const openBracketsSet = new Set();
    const identicalBracketsSet = new Set();
    bracketsConfig.forEach(brackets => {
            bracketMap[`${brackets[1]}`] = brackets[0];
            openBracketsSet.add(brackets[0]);
            if (brackets[0] === brackets[1]) {
                identicalBracketsSet.add(brackets[0]);
            }
        }
    );
    for (let i = 0; i < str.length; i++) {
        const bracket = str[i];
        if (openBracketsSet.has(bracket)) {
            if (identicalBracketsSet.has(bracket) && stack.peek() === bracket) {
                stack.pop();
                continue;
            }
            stack.push(bracket);
        } else {
            const lastOpenBracket = stack.pop();
            if (lastOpenBracket !== bracketMap[bracket]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}
