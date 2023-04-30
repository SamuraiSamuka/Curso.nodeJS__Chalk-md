import fs from 'fs';
import chalk from "chalk";
import pegaArquivo from "./index.js";
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(resultado, valida, identificador = '') {

    if(valida) {
        console.log(
            chalk.yellow('lista validada'), 
            chalk.black.bgGreen(identificador), 
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('lista de links -> '), 
            chalk.black.bgGreen(identificador), 
            resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    console.log(valida);

    try {
        fs.statSync(caminho);
    } catch (erro) {
        if (erro.code === "ENOENT") {
            console.log(chalk.white.bgRed('Erro: Arquivo ou diretório não existe.'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado, valida, caminho);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomedeArquivo) => {
            const lista = await pegaArquivo(`${caminho}${nomedeArquivo}`)
            imprimeLista(lista, valida, nomedeArquivo);
        })
    }
}

processaTexto(caminho);