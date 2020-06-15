#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const makeDesktopShortcut = (name, url) => {
    const innerText = `[Desktop Entry]
Encoding=UTF-8
Name=${name}
Type=Link
URL=${url}
Icon=text-html    
`;
    fs.writeFileSync(`/home/${process.env.USER}/Desktop/${name}.desktop`, innerText);
    console.log(`Создан новый ярлык "${name}"`);
};

let state = 0;
let name = '';
let url = '';
console.log('Введите наименование ярлыка: ');

rl.on('line', line => {
    switch (state) {
        case 0:
            if (line.trim()) {
                state = 1;
                name = line;
                console.log('Введите адрес ссылки: ');
            } else {
                console.log('Невалидное наименование, повторите ввод');
            }
            break;
        case 1:
            if (line.trim()) {
                state = 2;
                url = line;
                makeDesktopShortcut(name, url);
                rl.close();
            } else {
                console.log('Невалидный адрес ссылки, повторите ввод');
            }
            break;
    }
});