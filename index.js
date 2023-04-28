import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code,  ": não há arquivo no diretório", erro.cause));
}

function pegaArquivo(caminhoDoArquivo) {
    const enconding = 'utf-8';
    fs.readFile(caminhoDoArquivo, enconding, (erro, texto) => {
        if (erro) {
            trataErro(erro)
        }
        console.log(chalk.green(texto));
    });
}

pegaArquivo('./arquivos/');