import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code,  ": não há arquivo no diretório"));
}

async function pegaArquivo(caminhoDoArquivo) {
    
    // Forma assíncrona com async/await
    try {
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
        return extraiLinks(texto)
    } catch (erro) {
        trataErro(erro)
    }

    // Forma assíncrona com .then()
    // fs.promises
    //     .readFile(caminhoDoArquivo, enconding)
    //     .then((texto)=>console.log(chalk.green(texto)))
    //     .catch(trataErro)

    // Forma síncrona
    // fs.readFile(caminhoDoArquivo, enconding, (erro, texto) => {
    //     if (erro) {
    //         trataErro(erro)
    //     }
    //     console.log(chalk.green(texto));
    // });
}

function extraiLinks(entrada) {
    const texto = entrada;
    const regex = new RegExp(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/gm)
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length === 0 ? "não há links no arquivo" : resultados;
}

// pegaArquivo('./arquivos/texto.md');
// extraiLinks(pegaArquivo('./arquivos/texto.md'))

export default pegaArquivo;