const int = '123.12'.match(/^-?(?<int>\d+)(\.\d+)?$/).groups.int;

console.log(int);
