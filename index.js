const megaSena = require("./lib/mega-sena");
const lotoFacil = require("./lib/loto-facil");
const quina = require("./lib/quina");
const lotomania = require("./lib/lotomania");
const timemania = require("./lib/timemania");
const duplaSena = require("./lib/dupla-sena");
const loteca = require("./lib/loteca");
const diaDeSorte = require("./lib/dia-de-sorte");

exports.diaDeSorte = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await diaDeSorte.downloadResultadosDiaDeSorte();
      if (saveHtmlToFile)
        require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await diaDeSorte.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await diaDeSorte.downloadConcursoLoteca(null, concurso);
    }
    return await diaDeSorte.downloadResultadoLoteca();
  }
};

exports.loteca = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await loteca.downloadResultadosLoteca();
      if (saveHtmlToFile)
        require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await loteca.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await loteca.downloadConcursoLoteca(null, concurso);
    }
    return await loteca.downloadResultadoLoteca();
  }
};

exports.timemania = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await timemania.downloadResultadosTimemania();
      if (saveHtmlToFile)
        require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await timemania.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await timemania.downloadConcursoTimemania(null, concurso);
    }
    return await timemania.downloadResultadoTimemania();
  }
};

exports.duplaSena = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await duplaSena.downloadResultadosDuplaSena();
      if (saveHtmlToFile)
        require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await duplaSena.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await duplaSena.downloadConcursoDuplaSena(null, concurso);
    }
    return await duplaSena.downloadResultadoDuplaSena();
  }
};

exports.megaSena = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await megaSena.downloadResultadosMegaSena();
      if (saveHtmlToFile)
        require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await megaSena.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await megaSena.downloadConcursoMegaSena(null, concurso);
    }
    return await megaSena.downloadResultadoMegaSena();
  }
};

exports.lotoFacil = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await lotoFacil.downloadResultadosLotoFacil();
      require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await lotoFacil.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await lotoFacil.downloadConcursoLotoFacil(null, concurso);
    }
    return await lotoFacil.downloadResultadoLotoFacil();
  }
};

exports.quina = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await quina.downloadResultadosQuina();
      require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      console.log("DONWNLOAD, concluido");
    }

    return await quina.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await quina.downloadConcursoQuina(null, concurso);
    }
    return await quina.downloadResultadoQuina();
  }
};

exports.lotomania = async function (
  htmlResultados,
  saveHtmlToFile,
  historico = true,
  concurso = null
) {
  if (historico) {
    if (!htmlResultados) {
      htmlResultados = await lotomania.downloadResultadosLotomania();

      if (saveHtmlToFile) {
        require("fs").writeFileSync(saveHtmlToFile, htmlResultados);
      }
      console.log("DONWNLOAD, concluido");
    }

    return await lotomania.htmlToJson(htmlResultados);
  } else {
    if (concurso) {
      return await lotomania.downloadConcursoLotomania(null, concurso);
    }
    return await lotomania.downloadResultadoLotomania();
  }
};
